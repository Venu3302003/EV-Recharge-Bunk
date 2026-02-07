const firebaseConfig = {
  apiKey: "AIzaSyDJQH2_h4KHRTzMwKdrGa68TjMIEkRbH1M",
  authDomain: "ev-recharge-bunk-9929a.firebaseapp.com",
  projectId: "ev-recharge-bunk-9929a",
  storageBucket: "ev-recharge-bunk-9929a.firebasestorage.app",
  messagingSenderId: "729494075562",
  appId: "1:729494075562:web:dee6e90647cb08ca0c38d3",
  measurementId: "G-EVYZ8HDDK4"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


