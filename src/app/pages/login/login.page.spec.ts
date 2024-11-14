// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { LoginPage } from './login.page';
// import { Router } from '@angular/router';
// import { IonicModule, ToastController } from '@ionic/angular';
// import { AppRoutingModule } from 'src/app/app-routing.module';
// import { ReactiveFormsModule } from '@angular/forms';
// import { StoreModule, Store } from '@ngrx/store';
// import { loadingReducer } from 'src/store/loading/loading.reducers';
// import { loginReducer } from 'src/store/login/login.reducers';
// import { AppState } from 'src/store/AppState';
// import { loginFailed, recoverPassword, recoveredPasswordFailed, recoveredPasswordSuccess } from 'src/store/login/login.actions';
// import { AuthService } from 'src/app/services/auth/auth.service';
// import { of, throwError } from 'rxjs';
// import { User } from 'src/app/model/user/User';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   let router: Router;
//   let page: HTMLElement;
//   let store: Store<AppState>;
//   let toastController: ToastController;
//   let authService: AuthService

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginPage],
//       imports: [
//         IonicModule.forRoot(),
//         AppRoutingModule,
//         ReactiveFormsModule,
//         StoreModule.forRoot([]),
//         StoreModule.forFeature("loading", loadingReducer),
//         StoreModule.forFeature("login", loginReducer)
//       ]
//     }).compileComponents();
  
//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     fixture.detectChanges(); // should call ngOnInit
//     page = fixture.debugElement.nativeElement;
//     store = TestBed.inject(Store);
//     toastController = TestBed.inject(ToastController);
//     authService = TestBed.inject(AuthService);
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   })

//   it('should create a form on init', () => {
//     //component.ngOnInit();

//     expect(component.form).not.toBeUndefined();
//   })

//   it('should create login form empty', () => {

//     expect(component.form).not.toBeNull();
//     expect(component.form.get('email')).not.toBeNull();
//     expect(component.form.get('email')?.value).toEqual("");
//     expect(component.form.get('email')?.valid).toBeFalsy();
//     expect(component.form.get('password')).not.toBeNull();
//     expect(component.form.get('password')?.value).toEqual("");
//     expect(component.form.get('password')?.valid).toBeFalsy();
//   })

//   it('should have email invalid if email is not valid', () => {
//     component.form.get('email')?.setValue('invalid email');
//       expect(component.form.get('email')?.valid).toBeFalsy();
//   })

//   it('should have email valid if email is valid', () =>{
//     component.form.get('email')?.setValue('value@email.com');
//     component.form.get('password')?.setValue("anyPassword");
      
//     expect(component.form.get('email')?.valid).toBeTruthy();
//   })


//   it('should go to register page on register', () => {
//     spyOn(router, 'navigate');
//     component.register();
//     expect(router.navigate).toHaveBeenCalledWith(['register']);
//   })

//   it('should recover email and password on forgot email/password', () =>{
//     fixture.detectChanges();
//     component.form.get('email')?.setValue("valid@email.com")

//     const forgotButton = page.querySelector('#forgot-id') as HTMLElement;
//     forgotButton.click();

//     store.select('login').subscribe(loginState => {
//       expect(loginState.isRecoveringPassword).toBeTruthy();
//     })
//   })

//   it('should show loading when erecovering the password', () =>{
//     fixture.detectChanges();
//     store.dispatch(recoverPassword());
//     store.select('loading').subscribe(loadingState => {
//       expect(loadingState.show).toBeTruthy();
//     })
//   })

//   it('should hide the loading component and show a success message when the password is recovered', () =>{
//     spyOn(toastController, 'create');
    
//     fixture.detectChanges();
//     store.dispatch(recoverPassword());
//     store.dispatch(recoveredPasswordSuccess());
//     store.select('loading').subscribe(loadingState => {
//       expect(loadingState.show).toBeFalsy();
//     })

//     expect(toastController.create).toHaveBeenCalledTimes(1);
//   })

//   it('should hide the loading and show error message when error on recover password', () =>{
//     spyOn(toastController, 'create');
    
//     fixture.detectChanges();
//     store.dispatch(recoverPassword());
//     store.dispatch(recoveredPasswordFailed({error: "message"}));
//     store.select('loading').subscribe(loadingState => {
//       expect(loadingState.show).toBeFalsy();
//     })

//     expect(toastController.create).toHaveBeenCalledTimes(1);
//   })

//   it('should show loading and start loading process when the user is logging in', () =>{
//     fixture.detectChanges();
//     component.form.get('email')?.setValue('valid@email.com');
//     component.form.get('email')?.setValue('anyPassword');
//     const loginButton = page.querySelector('.login-button') as HTMLElement;
//     loginButton.click();

//     store.select('loading')?.subscribe(loadingState =>{
//       expect(loadingState.show).toBeTruthy();
//     })
//     store.select('login')?.subscribe(loginState =>{
//       expect(loginState.isLoggingIn).toBeTruthy();
//     })
//   })

//   it('should hide the loading component and send the user to the homepage', () => {
//     spyOn(router, 'navigate');
//     spyOn(authService, 'login').and.returnValue(of(new User()));

//     fixture.detectChanges();
//     component.form.get('email')?.setValue('valid@email.com');
//     component.form.get('email')?.setValue('anyPassword');
//     const loginButton = page.querySelector('.login-button') as HTMLElement;
//     loginButton.click();

//     store.select('loading')?.subscribe(loadingState =>{
//       expect(loadingState.show).toBeFalsy();
//     })
//     store.select('login')?.subscribe(loginState =>{
//       expect(loginState.isLoggedIn).toBeTruthy();
//     })

//     expect(router.navigate).toHaveBeenCalledWith(['homepage']);
//   })

//   it('should hide loading and show error message if incorrect login is entered',() =>{
//     spyOn(toastController, 'create');
//     spyOn(authService, 'login').and.returnValue(throwError(() => new Error('error')));

//     fixture.detectChanges();
//     component.form.get('email')?.setValue('error@email.com');
//     component.form.get('email')?.setValue('anyPassword');
//     store.dispatch(loginFailed({error: "message"}));
//     store.select('loading').subscribe(loadingState => {
//       expect(loadingState.show).toBeFalsy();
//     })

//     expect(toastController.create).toHaveBeenCalledTimes(1);
//   })
// });
