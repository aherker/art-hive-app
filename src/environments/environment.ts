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
    apiKey: "AIzaSyDmbEZQaXSARUZH0qiVx0xtjhlw8PnAXL4",
    authDomain: "art-hive-20786.firebaseapp.com",
    projectId: "art-hive-20786",
    storageBucket: "art-hive-20786.appspot.com",
    messagingSenderId: "1024686960621",
    appId: "1:1024686960621:web:73fba3104a9036f3d601e4"
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
