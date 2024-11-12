import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private _selectedColor: string = '#000000'; // Default color

  set selectedColor(color: string) {
    this._selectedColor = color;
  }

  get selectedColor() {
    return this._selectedColor;
  }
}



