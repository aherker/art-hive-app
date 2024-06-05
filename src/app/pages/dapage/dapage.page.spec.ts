import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DApagePage } from './dapage.page';

describe('DApagePage', () => {
  let component: DApagePage;
  let fixture: ComponentFixture<DApagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DApagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
