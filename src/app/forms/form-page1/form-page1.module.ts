import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPage1PageRoutingModule } from './form-page1-routing.module';

import { FormPage1Page } from './form-page1.page';

import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPage1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormPage1Page, AddQuestionModalComponent]
})
export class FormPage1PageModule {}
