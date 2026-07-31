import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraVision } from './camera-vision';

describe('CameraVision', () => {
  let component: CameraVision;
  let fixture: ComponentFixture<CameraVision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraVision],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraVision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
