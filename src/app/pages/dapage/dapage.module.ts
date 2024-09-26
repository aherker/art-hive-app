import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DApagePageRoutingModule } from './dapage-routing.module';

import { DApagePage } from './dapage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DApagePageRoutingModule
  ],
  declarations: [DApagePage]
})
export class DApagePageModule {}
