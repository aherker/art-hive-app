import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges(); // should call ngOnInit
  }));

  it('should create a form on init', () => {
    //component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should create login form empty', () => {

    expect(component.form).not.toBeNull();
    expect(component.form.get('email')).not.toBeNull();
    expect(component.form.get('email')?.value).toEqual("");
    expect(component.form.get('email')?.valid).toBeFalsy();
    expect(component.form.get('password')).not.toBeNull();
    expect(component.form.get('password')?.value).toEqual("");
    expect(component.form.get('password')?.valid).toBeFalsy();
  })

  it('should have email invalid if email is not valid', () => {
    component.form.get('email')?.setValue('invalid email');
      expect(component.form.get('email')?.valid).toBeFalsy();
  })

  it('should have email valid if email is valid', () =>{
    component.form.get('email')?.setValue('value@email.com');
    component.form.get('password')?.setValue("anyPassword");
      
    expect(component.form.get('email')?.valid).toBeTruthy();
  })

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['homepage']);
  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })
});
