import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarGostComponent } from './lekar-gost.component';

describe('LekarGostComponent', () => {
  let component: LekarGostComponent;
  let fixture: ComponentFixture<LekarGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LekarGostComponent]
    });
    fixture = TestBed.createComponent(LekarGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
