import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BootScreenComponent } from './boot-screen.component';
import { CommonModule } from '@angular/common';

describe('BootScreenComponent', () => {
  let component: BootScreenComponent;
  let fixture: ComponentFixture<BootScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootScreenComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BootScreenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});