import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any;

  // filterData object for searching 
  filterData: any = {
    packing_type: '',
    name: '',
    from_date: '',
    to_date: '',
    category: '',
    nature: '',
    page: '',
    id: ''
  }

  // onKeyUp function  for searching by name-

  onKeyUp(event: any) { // appending the updated value to the variable
    console.log("search working")
    console.log(event.target.value);
    // console.log(this.filterData);

    this.filterData.name = event.target.value;
    this.getProductList(1);
  }

  // onKeyUp function  for searching by  category - 

  onKeyUpCategory(eventCat: any) {
    console.log("search working for category")
    this.filterData.category = eventCat.target.value;
    this.getProductList(1);
    console.log(eventCat.target.value);
  }


  // Array And loop for pagination  -

  onChangePageNumber: any = [];

  onClickPageChange(pageNumber: any) {
    console.log("onclick function console work" + pageNumber);
    this.getProductList(pageNumber);
  }

  countPlus() {
    this.filterData.page = this.filterData.page + 1;
    this.getProductList(this.filterData.page)
  }
  countMinus() {
    this.filterData.page = this.filterData.page - 1;
    this.getProductList(this.filterData.page)
  }

  deleteItem(id: number) {
    console.log("delete by id work");
    console.log(id);
    this.getDeleteList(id);
  }


  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

    this.getProductList(1);
  }


  getProductList(pageNumber: any) {
    this.onChangePageNumber = []
    console.log("page change work and we are on page number  -  " + pageNumber);
    this.filterData.page = pageNumber;
    console.log("filterdatapage" + this.filterData.page);
    this.authservice.getProductList(this.filterData).subscribe((res: any) => {
      console.log("getproduct");
      console.log("this is res - obj" );
      console.log(res);
      
      console.log("res data -" )
      console.log(res.data);
      
      this.productList = res.data.data;
      console.log(this.productList);
      console.log(res.data.last_page)
      for (let i = 0; i <= res.data.last_page - 1; i++) {
        this.onChangePageNumber.push(i + 1)
      }

    })
  }

//delete  
  getDeleteList(id: number) {

    this.authservice.getDeleteList(id).subscribe((result: any) => {
      console.log("delete 2 work");
      console.log(result);
      alert("do you want to delete this product ??")
      this.getProductList(this.filterData.page)
      // alert(result.message)
    }, (error: any) => {
      console.log(error);

    })
  }



}