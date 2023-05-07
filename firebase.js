const firebaseConfig = {
  apiKey: "AIzaSyDB_uT7h0PmjmQPLua0Lbz2_31b1Xr5oJU",
  authDomain: "todoapp-ea2ef.firebaseapp.com",
  projectId: "todoapp-ea2ef",
  storageBucket: "todoapp-ea2ef.appspot.com",
  messagingSenderId: "929678714706",
  appId: "1:929678714706:web:061a06cfc6db69c315bc8b",
  measurementId: "G-46PL1G5V7Z"
};

//intialise firebase
firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();