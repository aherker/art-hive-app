import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPage2Page } from './form-page2.page';

const routes: Routes = [
  {
    path: '',
    component: FormPage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPage2PageRoutingModule {}
