import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPage2PageRoutingModule } from './form-page2-routing.module';

import { FormPage2Page } from './form-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPage2PageRoutingModule
  ],
  declarations: [FormPage2Page]
})
export class FormPage2PageModule {}
