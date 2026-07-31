import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBoot } from './module-boot';

describe('ModuleBoot', () => {
  let component: ModuleBoot;
  let fixture: ComponentFixture<ModuleBoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleBoot],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleBoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
