import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPurchaseListComponent } from './bill-purchase-list.component';

describe('BillPurchaseListComponent', () => {
  let component: BillPurchaseListComponent;
  let fixture: ComponentFixture<BillPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPurchaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
