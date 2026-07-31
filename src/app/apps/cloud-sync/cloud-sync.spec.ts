import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSync } from './cloud-sync';

describe('CloudSync', () => {
  let component: CloudSync;
  let fixture: ComponentFixture<CloudSync>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSync],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSync);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
