import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { Store } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//import { db } from 'src/main' //--
import {FirestoreService } from 'src/app/services/firestore.service';

import { ColorPickerModule } from 'ngx-color-picker';
import { ResetPasswordPagePageModule  } from './pages/reset-password-page/reset-password-page.module';


@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ...AppStoreModule, StoreDevtoolsModule.instrument({maxAge: 25}), FormsModule, ReactiveFormsModule, ResetPasswordPagePageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FirestoreService, ColorPickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
