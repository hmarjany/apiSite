import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormelyButtonComponent } from './formely-button.component';

describe('FormelyButtonComponent', () => {
  let component: FormelyButtonComponent;
  let fixture: ComponentFixture<FormelyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormelyButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormelyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
