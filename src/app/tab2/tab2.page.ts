// tab2.page.ts
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  selectedColor: string = '#000000'; // Default color

  constructor(private authService: AuthenticationService, private router: Router, private colorService: ColorService, private menu: MenuController) {}

  ngOnInit() {
    // Initialize selectedColor from ColorService on component initialization
    this.selectedColor = this.colorService.selectedColor; // Get color from ColorService
    this.updateCSSVariable(this.selectedColor); // Update CSS variable for the initial color
  }



  openMenu() {
    this.menu.toggle(); // Replace 'mainMenu' with your menu ID
  }

  menuDidOpen() {
    console.log('Menu opened');
  }

  menuDidClose() {
    console.log('Menu closed');
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

