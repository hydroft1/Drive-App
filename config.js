// firebase config key setup

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA21rVqxj13wAmHBASmqaVhIAZGl4km314",
  authDomain: "drive-aac.firebaseapp.com",
  projectId: "drive-aac",
  storageBucket: "drive-aac.appspot.com",
  messagingSenderId: "680037822919",
  appId: "1:680037822919:web:e1fd16033f8841b945e9e2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
