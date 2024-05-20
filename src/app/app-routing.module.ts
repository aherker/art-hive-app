import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   //changed "loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) to loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)"
  //   path: '',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  // },
  {
    path: "tabs",
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: "currentForm",
  //   loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: 'form-page2',
  //   loadChildren: () => import('./form-page2/form-page2.module').then( m => m.FormPage2PageModule)
  // },
  // {
  //   path: 'dapage',
  //   loadChildren: () => import('./dapage/dapage.module').then( m => m.DApagePageModule)
  // },
  // {
  //   path: 'form-page3',
  //   loadChildren: () => import('./form-page3/form-page3.module').then( m => m.FormPage3PageModule)
  // },
  
  //changed "path: 'login => path: ''"
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  //for the time being this is a harcoded redirect but logic will be needed to authenticate the login
  {
    path: 'homepage',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'form-page1',
    loadChildren: () => import('./forms/form-page1/form-page1.module').then(m => m.FormPage1PageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'form-page1',
    loadChildren: () => import('./forms/form-page1/form-page1.module').then( m => m.FormPage1PageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
