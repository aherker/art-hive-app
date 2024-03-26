import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage2Page } from './form-page2.page';

describe('FormPage2Page', () => {
  let component: FormPage2Page;
  let fixture: ComponentFixture<FormPage2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPage2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
