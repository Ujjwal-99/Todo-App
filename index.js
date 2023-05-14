const newTask=document.querySelector('#addTask');
const btn=document.querySelector('#addTaskBtn');

btn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(newTask.value === '')
    return;
    else{
        db.collection('TodoItems').add({
            text: newTask.value,
            Status: 'pending',
        });
    }
    newTask.value= '';
});

// fetch data
function getItem() {
	db.collection('TodoItems').onSnapshot((snapshot) => {
        // console.log(snapshot);
		let items = [];
		snapshot.docs.forEach((doc) => {
			items.push({
				id: doc.id,
				...doc.data(),
			});
		});
		generateItems(items);
        sortTask(items);
	});
}

function sortTask(items) {
    let pending = [];
    let completed = []; 
    let sortbtn = document.querySelectorAll('.sortLink');

    items.forEach((item)=>{
        if(item.Status === 'completed')completed.push(item);
        else pending.push(item);
    });
    sortbtn.forEach((link) =>{
        link.addEventListener('click',(e)=>{
            if (link.textContent.trim() === 'All'){
                generateItems(items);
            }else if (link.textContent.trim()=== 'Pending'){
                generateItems(pending);
            }else if (link.textContent.trim()=== 'Completed'){
                generateItems(completed);
            }
        });
    });
}

getItem();

function generateItems(items) {
    let tasks ='';
    items.forEach((item) => {
        let Status = item.Status === 'completed' ? 'checked' : '';
        tasks += `<li id="${item.id}" class="input-group mt-5 mb-3 d-flex justify-content-between align-items-center border border-bottom border-1 px-2 py-2">
        <div class="d-flex ">
        <input type="checkbox" name="" id="checkbox" 
        ${Status}>
        <label type="checkbox" class=" px-3 " >${item.text}</label>
        </div> 
        <i class="fa-solid fa-trash" id="dustbin" style="color: #1162ee;"></i> 
      </li>`;
    });
    document.querySelector('#taskList').innerHTML = tasks ;
    let checkbox = document.querySelectorAll('#checkbox');
	checkbox.forEach((item) => {
		let task = item.nextElementSibling;
		if (item.checked === true) {
			task.classList.add('text-decoration-line-through');
		}
	});
    todoStatusScan();
    deleteTask();
};




function todoStatusScan() {
	let todoStatus = document.querySelectorAll('#checkbox');
	todoStatus.forEach((item) => {
		item.addEventListener('click', (e) => {
			let id = item.parentElement.parentElement.id;
           

			let task = db.collection('TodoItems').doc(id);

			task.get().then((doc) => {
               
				if (doc.data().Status === 'pending') {
					task.update({
						Status: 'completed',
					});
				} else {
					    task.update({
                        Status: 'pending',
					});
				}
			});
		});
	});
}



// function deleteTask (){
//     const deleteBtn = document.querySelector('#dustbin');
//     deleteBtn.forEach((item)=>{
//         deleteBtn.addEventListener
//     });
// }

function deleteTask() {
	const deleteBtn = document.querySelectorAll('#dustbin');

	deleteBtn.forEach((item) => {
		item.addEventListener('click', (e) => {
			let id = item.parentElement.id;
			db.collection('TodoItems').doc(id).delete();
		});
	});
}

