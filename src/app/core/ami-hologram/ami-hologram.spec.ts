import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmiHologram } from './ami-hologram';

describe('AmiHologram', () => {
  let component: AmiHologram;
  let fixture: ComponentFixture<AmiHologram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmiHologram],
    }).compileComponents();

    fixture = TestBed.createComponent(AmiHologram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
