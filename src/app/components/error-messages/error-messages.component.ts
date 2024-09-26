import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent  implements OnInit {

  @Input() message!: string;
  @Input() field!: AbstractControl | null;
  @Input() error!: string;
  constructor() { }

  ngOnInit() {}

  shouldShowComponent(){
    if(this.field && this.field.touched && this.field.errors?.[this.error]){
      return true;
    }

    
    return false;
  }
}
