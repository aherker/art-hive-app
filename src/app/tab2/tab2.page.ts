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
  temporaryColor: string = '#000000'; 

  constructor(private authService: AuthenticationService, private router: Router, private colorService: ColorService, private menu: MenuController) {}

  ngOnInit() {
    // Initialize selectedColor from ColorService on component initialization
    this.selectedColor = this.colorService.selectedColor; // Get color from ColorService
    
  }



  openMenu() {
    this.menu.toggle(); // Replace 'mainMenu' with your menu ID
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

  previewColor(color: string) {
    this.temporaryColor = color;
  }
  
  // Apply the color when the button is clicked
  async applyColor() {
    this.colorService.selectedColor = this.temporaryColor;
    document.documentElement.style.setProperty('--app-background-color', this.colorService.selectedColor);
    await this.colorService.saveColorToFirestore(this.temporaryColor);
    console.log('Applied color:', this.colorService.selectedColor);
  }


}

