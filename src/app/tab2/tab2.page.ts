// tab2.page.ts
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  selectedColor: string = '#000000'; // Default color

  constructor(private authService: AuthenticationService, private router: Router, private colorService: ColorService) {}

  ngOnInit() {
    // Initialize selectedColor from ColorService on component initialization
    this.selectedColor = this.colorService.selectedColor; // Get color from ColorService
    this.updateCSSVariable(this.selectedColor); // Update CSS variable for the initial color
  }

  // Method to handle sign out
  logout() {
    this.authService.logout().then(() => {
      console.log('User signed out');
      this.router.navigate(['/login']); // Redirect to login page after signing out
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  }

  updateCSSVariable(color: string) {
    this.colorService.selectedColor = color;
    console.log(this.colorService.selectedColor);
    document.documentElement.style.setProperty('--app-background-color', color);
  }


}

