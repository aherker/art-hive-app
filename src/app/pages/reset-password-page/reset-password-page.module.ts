import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPagePageRoutingModule } from './reset-password-page-routing.module';

import { ResetPasswordPagePage } from './reset-password-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResetPasswordPagePageRoutingModule,
  ],
  declarations: [ResetPasswordPagePage],
  exports: [ResetPasswordPagePage]
})
export class ResetPasswordPagePageModule {}
