import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessagesComponent } from './error-messages.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessagesComponent', () => {
  let component: ErrorMessagesComponent;
  let fixture: ComponentFixture<ErrorMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessagesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show err msg when the field is touched and an err is present', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAllAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anyError"

    expect(component.shouldShowComponent()).toBeTruthy();
  })
 
  it('should hide err msg on field not touched', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.setErrors({anyError: true});
    component.error = "anyError"

    expect(component.shouldShowComponent()).toBeFalsy();
  })

  it('should hide err msg on field touched but there are no err msg', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAllAsTouched();
    component.error = "anyError"

    expect(component.shouldShowComponent()).toBeFalsy();
  })


  it('should hide err msg on field touched and has err, but err is different msg', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAllAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anotherError"

    expect(component.shouldShowComponent()).toBeFalsy();
  })
});
