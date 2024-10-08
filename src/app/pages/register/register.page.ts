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

  constructor(private authService: AuthenticationService, private router: Router) {}

  // Function to handle user registration
  register() {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password).then(
        (userCredential) => {
          console.log('User registered:', userCredential);
          this.router.navigate(['/login']); // Navigate to login after successful registration
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Passwords do not match');
    }
  }
}
