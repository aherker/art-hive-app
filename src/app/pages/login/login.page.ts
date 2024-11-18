import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { FirestoreService } from 'src/app/services/firestore.service';  // Import FirestoreService
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router, private globalService: GlobalService, private firestoreService: FirestoreService, private colorService: ColorService) {}

  // Function to handle user login
  login() {
    this.authMessageReset();

    this.authService.login(this.email, this.password).then(
      async (userCredential) => {
        console.log('User logged in:', userCredential);
        const userId = userCredential.user.uid;
        this.globalService.setUserId(userId);

        this.email = '';
        this.password = '';
        
        const color = await this.firestoreService.getUserColor(userId);
        this.colorService.selectedColor = color
        document.documentElement.style.setProperty('--app-background-color', color);
        
        this.router.navigate(['/tabs/tab2']); // Navigate to dashboard or home after successful login
      },
      (error) => {
        console.error('Login failed', error);
        this.handleLoginError(error);
      }
    );
  }

  // Reset the error message
  authMessageReset() {
      this.errorMessage = '';
  }

  // Handle login errors and set error messages
  handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        this.errorMessage = 'Incorrect Username or Password. Please try again.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Invalid email format.';
        break;
      default:
        this.errorMessage = 'Login failed. Please try again.';
    }
  }

}
