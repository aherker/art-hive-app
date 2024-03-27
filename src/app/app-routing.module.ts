import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'form-page2',
    loadChildren: () => import('./form-page2/form-page2.module').then( m => m.FormPage2PageModule)
  },
  {
    path: 'dapage',
    loadChildren: () => import('./dapage/dapage.module').then( m => m.DApagePageModule)
  },
  {
    path: 'form-page3',
    loadChildren: () => import('./form-page3/form-page3.module').then( m => m.FormPage3PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
