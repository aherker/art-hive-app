import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage3Page } from './form-page3.page';

describe('FormPage3Page', () => {
  let component: FormPage3Page;
  let fixture: ComponentFixture<FormPage3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPage3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
