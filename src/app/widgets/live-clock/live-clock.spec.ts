import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClock } from './live-clock';

describe('LiveClock', () => {
  let component: LiveClock;
  let fixture: ComponentFixture<LiveClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClock],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
