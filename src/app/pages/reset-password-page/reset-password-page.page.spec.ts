import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordPagePage } from './reset-password-page.page';

describe('ResetPasswordPagePage', () => {
  let component: ResetPasswordPagePage;
  let fixture: ComponentFixture<ResetPasswordPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
