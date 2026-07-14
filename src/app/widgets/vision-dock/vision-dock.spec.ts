import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionDock } from './vision-dock';

describe('VisionDock', () => {
  let component: VisionDock;
  let fixture: ComponentFixture<VisionDock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionDock],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionDock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
