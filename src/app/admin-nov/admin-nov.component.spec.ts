import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovComponent } from './admin-nov.component';

describe('AdminNovComponent', () => {
  let component: AdminNovComponent;
  let fixture: ComponentFixture<AdminNovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
