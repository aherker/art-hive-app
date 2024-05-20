import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPage1Page } from './form-page1.page';

const routes: Routes = [
  {
    path: '',
    component: FormPage1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPage1PageRoutingModule {}
