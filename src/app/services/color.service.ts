// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ColorService {
//   private _selectedColor: string = '#000000'; // Default color

//   set selectedColor(color: string) {
//     this._selectedColor = color;
//   }

//   get selectedColor() {
//     return this._selectedColor;
//   }
// }

import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';  // Import FirestoreService
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private _selectedColor: string = '#000000';

  constructor(
    private firestoreService: FirestoreService,
    private globalService: GlobalService
  ) {}

  set selectedColor(color: string) {
    this._selectedColor = color;
    this.saveColorToFirestore(color);

    const textColor = this.getContrastColor(color)
    document.documentElement.style.setProperty('--app-text-color', textColor);
  }

  get selectedColor() {
    return this._selectedColor;
  }

  async saveColorToFirestore(color: string) {
    const userId = this.globalService.getUserId();
    if (userId && userId !== 'NotLoggedIn') {
      await this.firestoreService.updateDocument('userColors', 'colorChoices', {
        [userId]: color
      });
    }
  }

   // Function to determine the contrast color (light or dark text)
   private getContrastColor(hexColor: string): string {
    // Remove '#' if present
    hexColor = hexColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate luminance using the formula
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // If luminance is > 128, it's a light color (use dark text), else dark background (use light text)
    return luminance > 128 ? '#000000' : '#FFFFFF';
  }


  

}





