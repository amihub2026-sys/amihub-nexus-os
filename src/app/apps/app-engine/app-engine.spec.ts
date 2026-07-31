import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEngine } from './app-engine';

describe('AppEngine', () => {
  let component: AppEngine;
  let fixture: ComponentFixture<AppEngine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEngine],
    }).compileComponents();

    fixture = TestBed.createComponent(AppEngine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
