import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantPanel } from './assistant-panel';

describe('AssistantPanel', () => {
  let component: AssistantPanel;
  let fixture: ComponentFixture<AssistantPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
