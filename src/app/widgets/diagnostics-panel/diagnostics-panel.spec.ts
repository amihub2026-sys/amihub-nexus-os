import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsPanel } from './diagnostics-panel';

describe('DiagnosticsPanel', () => {
  let component: DiagnosticsPanel;
  let fixture: ComponentFixture<DiagnosticsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
