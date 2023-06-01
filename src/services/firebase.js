// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRxdlQeI2lthqhFdAlgI9NWcssAnZIyzo",
  authDomain: "tp1-clientes-tallarico-navarro.firebaseapp.com",
  projectId: "tp1-clientes-tallarico-navarro",
  storageBucket: "tp1-clientes-tallarico-navarro.appspot.com",
  messagingSenderId: "447463420063",
  appId: "1:447463420063:web:df2d2d40929c3d137f72aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;