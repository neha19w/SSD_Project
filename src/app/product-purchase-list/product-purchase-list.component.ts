import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-purchase-list',
  templateUrl: './product-purchase-list.component.html',
  styleUrls: ['./product-purchase-list.component.css']
})
export class ProductPurchaseListComponent implements OnInit {

  productPurchaseList: any
  totalAmount:any=0;
  id:any=0
  // to get id - 
  allData: any = {
    id: '',
    quantity:'',
    selling_price:''
  }


//click delete btn function- 
  productPurchaseDelete(id:any){
    this.getDeleteProductPurchaseListApi(id);
  }

  constructor(private authservice: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.getProductPurchaseListApi(this.id)

  }

  // product purchase add list show, get api - 
  getProductPurchaseListApi(bill_id: any) {

    console.log("getProductPurchaseListApi works");

    this.authservice.getProductPurchaseListApi(bill_id).subscribe((result: any) => {
      console.log("getproduct data");
      this.productPurchaseList = result.data

      console.log(this.productPurchaseList);

      for (let index = 0; index < this.productPurchaseList.length; index++) {
        console.log("inside for");
        this.totalAmount = this.totalAmount + this.productPurchaseList[index].quantity * this.productPurchaseList[index].selling_price
      }
      
      console.log(this.totalAmount);
      
    })
  }

  // product purchase delete list show get api - 

  getDeleteProductPurchaseListApi(bill_id: any) {
    console.log("getDeleteProductPurchaseListApi work");

    this.authservice.getDeleteProductPurchaseListApi(bill_id).subscribe((result: any) => {
      this.getProductPurchaseListApi(bill_id);
    })
  }

}
