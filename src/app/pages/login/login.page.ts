import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  // Function to handle user login
  login() {
    this.authService.login(this.email, this.password).then(
      (userCredential) => {
        console.log('User logged in:', userCredential);
        this.router.navigate(['homepage']); // Navigate to dashboard or home after successful login
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
