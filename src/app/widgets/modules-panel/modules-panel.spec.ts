import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesPanel } from './modules-panel';

describe('ModulesPanel', () => {
  let component: ModulesPanel;
  let fixture: ComponentFixture<ModulesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
