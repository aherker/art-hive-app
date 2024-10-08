import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth"; 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  const firebaseConfig = {
    apiKey: "AIzaSyDyoDGDvQgaCJHKVon6tpQ6BsGdklCFCes",
    authDomain: "testerarthive.firebaseapp.com",
    projectId: "testerarthive",
    storageBucket: "testerarthive.appspot.com",
    messagingSenderId: "627720389810",
    appId: "1:627720389810:web:f0523058a5dc73420af5ab",
    measurementId: "G-70WZE3NN4L"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);