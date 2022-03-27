import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList: any;

  constructor(private authservice: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getSupplierList();
  }

  getSupplierList() {
    console.log("work get api");

    this.authservice.getSupplierList().subscribe((res: any) => {
      console.log(res);
      this.supplierList = res.data;
      console.log(this.supplierList);

    }, (error: any) => {
      console.log(error);
    });
  }

}
