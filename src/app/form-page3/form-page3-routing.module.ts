import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPage3Page } from './form-page3.page';

const routes: Routes = [
  {
    path: '',
    component: FormPage3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPage3PageRoutingModule {}
