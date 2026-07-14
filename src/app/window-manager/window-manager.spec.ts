import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowManager } from './window-manager';

describe('WindowManager', () => {
  let component: WindowManager;
  let fixture: ComponentFixture<WindowManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowManager],
    }).compileComponents();

    fixture = TestBed.createComponent(WindowManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
