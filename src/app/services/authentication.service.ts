// authentication.service.ts
import { Injectable } from '@angular/core';
import { auth } from 'src/main';  
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent successfully.');
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      throw error; // Re-throw error for further handling (optional)
    }
  }

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
