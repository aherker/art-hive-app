// tab2.page.ts
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  constructor(private authService: AuthenticationService, private router: Router) {}

  // Method to handle sign out
  logout() {
    this.authService.logout().then(() => {
      console.log('User signed out');
      this.router.navigate(['/login']); // Redirect to login page after signing out
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  }
}

