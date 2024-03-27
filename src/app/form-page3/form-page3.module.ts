import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPage3PageRoutingModule } from './form-page3-routing.module';

import { FormPage3Page } from './form-page3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPage3PageRoutingModule
  ],
  declarations: [FormPage3Page]
})
export class FormPage3PageModule {}
