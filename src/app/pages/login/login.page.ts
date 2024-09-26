import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { show, hide } from 'src/store/loading/loading.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoveredPasswordFailed, recoveredPasswordSuccess, resetPasswordRecoveryFlag, login, loginSuccess, loginFailed } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private authService: AuthService){

  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword());
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
  
      this.onIsLoggedIn(loginState);
      this.onIsLoggingin(loginState);
      this.toggleLoadingState(loginState);
      this.onError(loginState);
    })
    
  }

  ngOnDestroy() {
      if(this.loginStateSubscription){
        this.loginStateSubscription.unsubscribe();
      }
  }

  private async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger",
        duration: 3000
      })

      toaster.present();
    }
  }

  private toggleLoadingState(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  private onIsRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){  
      this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(
        () => {
          this.store.dispatch(recoveredPasswordSuccess());
        },
        (error) => {
          this.store.dispatch(recoveredPasswordFailed({error}));
        }
      );
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "success",
        duration: 3000
      })

      toaster.present();

      this.store.dispatch(resetPasswordRecoveryFlag());
    }
  }

  private onIsLoggingin(loginState: LoginState){
    if(loginState.isLoggingIn){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password)?.subscribe(user => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFailed({error}));
      })
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['homepage']);
    }
  }


  login(){
    this.store.dispatch(login());
  }

  register(){
    this.router.navigate(['register']);
  }
}
