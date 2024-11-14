import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  async register() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords don't match.";
      return;
    }

    try {
      // Attempt to sign up using AuthService
      const userCredential = await this.authService.register(this.email, this.password);
      console.log('User registered:', userCredential);
      this.router.navigate(['/login']); // Navigate to login after successful registration
    } catch (error: any) {
      console.error('Registration failed', error);

      // Use a helper function to standardize the error message
      this.errorMessage = this.getErrorMessage(error.code);
    }
  }

  // Helper function to standardize error messages
  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/operation-not-allowed':
        return 'Email/password sign-up is disabled.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later.';
      default:
        return 'An unknown error occurred.';
    }
  }

  // Function to handle user registration
  // register() {
  //   if (this.password === this.confirmPassword) {
  //     this.authService.register(this.email, this.password).then(
  //       (userCredential) => {
  //         console.log('User registered:', userCredential);
  //         this.router.navigate(['/login']); // Navigate to login after successful registration
  //       },
  //       (error) => {
  //         console.error('Registration failed', error);
  //       }
  //     );
  //   } else {
  //     console.error('Passwords do not match');
  //   }
  // }

}
