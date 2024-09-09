// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


export const environment = {
  production: false,
  //---------------------------------------------ADDED FOR FIREBASE TESTING---------------------------------------------------------------------------//

  firebaseConfig:{
  apiKey: "AIzaSyAAfMAgiwXgap0kmkv9O_Ehj9KGhVKyFMk",
  authDomain: "arthive2024.firebaseapp.com",
  projectId: "arthive2024",
  storageBucket: "arthive2024.appspot.com",
  messagingSenderId: "975354135360",
  appId: "1:975354135360:web:fafb2df9b0de74b37370a5",
  measurementId: "G-MPM1V6QEM6"
  //---------------------------------------------ADDED FOR FIREBASE TESTING---------------------------------------------------------------------------//

  }
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
