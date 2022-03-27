import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseListComponent } from './product-purchase-list.component';

describe('ProductPurchaseListComponent', () => {
  let component: ProductPurchaseListComponent;
  let fixture: ComponentFixture<ProductPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPurchaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
