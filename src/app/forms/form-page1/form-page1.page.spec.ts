import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage1Page } from './form-page1.page';

describe('FormPage1Page', () => {
  let component: FormPage1Page;
  let fixture: ComponentFixture<FormPage1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
