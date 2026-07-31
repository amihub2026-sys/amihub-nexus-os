import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEngine } from './web-engine';

describe('WebEngine', () => {
  let component: WebEngine;
  let fixture: ComponentFixture<WebEngine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebEngine],
    }).compileComponents();

    fixture = TestBed.createComponent(WebEngine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
