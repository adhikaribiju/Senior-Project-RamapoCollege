// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

/*
Firebase Configuration
NAME
    firebaseConfig
SYNOPSIS
    This script initializes the Firebase app using the provided configuration.
DESCRIPTION
    This code imports the necessary functions from the Firebase SDK and initializes a Firebase app with the given configuration. 
    The configuration includes essential Firebase details like the API key, authentication domain, project ID, and other Firebase service details.

FIREBASE CONFIGURATION
    - apiKey: API key used to authenticate Firebase services.
    - authDomain: Domain for Firebase Authentication.
    - projectId: Firebase project ID.
    - storageBucket: URL for Firebase storage services.
    - messagingSenderId: Unique ID for Firebase Cloud Messaging.
    - appId: Firebase application ID.

RETURNS
    Exports the initialized Firebase app instance for use in other parts of the application.
*/

const firebaseConfig = {
  apiKey: 'AIzaSyApz5XlXqycdMNTeNVxGneFIzVUvmEFLSs',
  authDomain: "ramapo-patro.firebaseapp.com",
  projectId: "ramapo-patro",
  storageBucket: "ramapo-patro.appspot.com",
  messagingSenderId: "1074212666148",
  appId: "1:1074212666148:web:f199738e91ba39aba4d1b1"
};
console.log(firebaseConfig.apiKey);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;