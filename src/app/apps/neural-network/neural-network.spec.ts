import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetwork } from './neural-network';

describe('NeuralNetwork', () => {
  let component: NeuralNetwork;
  let fixture: ComponentFixture<NeuralNetwork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeuralNetwork],
    }).compileComponents();

    fixture = TestBed.createComponent(NeuralNetwork);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
