import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCoreComponent } from './ai-core.component';

describe('AiCoreComponent', () => {
  let component: AiCoreComponent;
  let fixture: ComponentFixture<AiCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiCoreComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});