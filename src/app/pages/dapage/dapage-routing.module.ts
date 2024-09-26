import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DApagePage } from './dapage.page';

const routes: Routes = [
  {
    path: '',
    component: DApagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DApagePageRoutingModule {}
