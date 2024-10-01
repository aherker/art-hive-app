// authentication.service.ts
import { Injectable } from '@angular/core';
import { auth } from 'src/main';  
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  // Login with email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Register a new user
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout
  logout() {
    return signOut(auth);
  }
}
