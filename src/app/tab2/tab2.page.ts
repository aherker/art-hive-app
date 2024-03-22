import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  displayText: string = ''; // Initialize displayText as an empty string

  constructor() {}


  onClickButton() {
    this.displayText = 'Fill out Form Button clicked! Text displayed.';
    // Add your code here to handle the button click
  }

  ionViewWillLeave() {
    this.displayText = ''; // Clear the displayText when leaving the page
  }

}
