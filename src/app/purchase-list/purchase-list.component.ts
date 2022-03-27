import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchaseList: any = [];


  allData: any = {
    id: '',
    bill_number: '',
    name: '',
    page: ''
  }

  onChangePageNo: any = [];


  onClickPageChange(pageNumber: any) {
    console.log("onclick function console work" + pageNumber);
    this.getPurchaseList(pageNumber);
  }

  countPlus() {
    this.allData.page = this.allData.page + 1;
    this.getPurchaseList(this.allData.page)
  }
  countMinus() {
    this.allData.page = this.allData.page - 1;
    this.getPurchaseList(this.allData.page)
  }
  deleteBill(id: number) {
    console.log("Delete bill function work");
    
    this.getDeletePurchaseListApi(id);
  }


  constructor(private authservice: AuthService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getPurchaseList(1);

  }
  //get all bill list -
  getPurchaseList(pageNumber: any) {
    console.log("work purchase api");
    this.onChangePageNo = []
    console.log("page change work and we are on page number  -  " + pageNumber);
    console.log(this.allData.last_page);

    this.allData.page = pageNumber;
    console.log(this.allData.page);
    console.log("we are");

    this.authservice.getPurchaseList().subscribe((res: any) => {
      console.log("res");
      console.log(res);
      this.purchaseList = res.data;
      console.log(this.purchaseList);

      for (let i = 0; i <= res.data.last_page - 1; i++) {
        this.onChangePageNo.push(i + 1);
      }

    })
  }

  // get all bill list -
  // getPurchaseList() {
  //   console.log("work purchase api");
  //   this.authservice.getPurchaseList().subscribe((res: any) => {
  //     console.log("res");
  //     console.log(res);
  //     this.purchaseList = res.data;
  //     console.log(this.purchaseList);
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  // onclick function of delete button - 

  

  // delete bill purchase list api -

  getDeletePurchaseListApi(id: number) {
    this.authservice.getDeletePurchaseListApi(id).subscribe((result: any) => {

      console.log("delete api works");
      this.getPurchaseList(this.allData.page);
    }, (error: any) => {
      console.log(error);

    })
  }


}