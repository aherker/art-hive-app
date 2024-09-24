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
    apiKey: "AIzaSyAeklfOQEhWyIorDiu_oz3P_uN1JusMcTs",
    authDomain: "art-hive-28b41.firebaseapp.com",
    projectId: "art-hive-28b41",
    storageBucket: "art-hive-28b41.appspot.com",
    messagingSenderId: "421997646291",
    appId: "1:421997646291:web:9d2f19d2e72d0c37a0df26",
    measurementId: "G-0JE5DWFD56"
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
