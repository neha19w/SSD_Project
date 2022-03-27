import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAddPurchaseListComponent } from './bill-add-purchase-list.component';

describe('BillAddPurchaseListComponent', () => {
  let component: BillAddPurchaseListComponent;
  let fixture: ComponentFixture<BillAddPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillAddPurchaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAddPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
