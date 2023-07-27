import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingplanComponent } from './pricingplan.component';

describe('PricingplanComponent', () => {
  let component: PricingplanComponent;
  let fixture: ComponentFixture<PricingplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingplanComponent]
    });
    fixture = TestBed.createComponent(PricingplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
