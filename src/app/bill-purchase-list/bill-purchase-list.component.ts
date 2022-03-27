import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-purchase-list',
  templateUrl: './bill-purchase-list.component.html',
  styleUrls: ['./bill-purchase-list.component.css']
})

export class BillPurchaseListComponent implements OnInit {

  selectedFiles: any
  bill_id: any
  SupplierList: any
  submitbutton = "Add Bill"
  isUpdatePage: any
  imageUrl: any
  headingAdd = "Add a Purchase";

  // this Global currentBillId is working for 2 things 1 for Edit and 2 for html routes to show and the Product List - 
  currentBillId: number = 0;


  billSaveForm = new FormGroup({

    payment_status: new FormControl(),
    bill_number: new FormControl(),
    bill_image: new FormControl(),
    supplier_id: new FormControl(),
    total_price: new FormControl(),
    paid_amount: new FormControl(),
    payment_method: new FormControl(),
    transaction_id: new FormControl(),
    bill_date_transaction: new FormControl(),
    bill_date_purchase: new FormControl(),
    order_number: new FormControl()

  });


  calculateDate(milliSeconds: any): any {
    let date1 = new Date(milliSeconds);
    // let time = date1.toLocaleTimeString();
    let date = this.datepipe.transform(date1, 'yyyy-MM-ddTHH:mm');
    return date
  };

  constructor(private authservice: AuthService, private route: ActivatedRoute, public datepipe: DatePipe, public router: Router) { }

  ngOnInit(): void {

    this.getSupplierListApi();

    this.currentBillId = this.route.snapshot.params.id;
    console.log("currentBillId ", this.currentBillId);

    if (this.currentBillId) {
      console.log("BillPurchaseListComponent : id specific data is here");
      this.authservice.getIdSpecificBill(this.currentBillId).subscribe((result: any) => {
        console.log(this.calculateDate(result.data.bill_info_data.bill_date_transaction))

        console.log(result.data);


        this.billSaveForm = new FormGroup({
          id: new FormControl(result.data.bill_info_data.id),
          payment_status: new FormControl(result.data.bill_info_data.payment_status),
          bill_number: new FormControl(result.data.bill_info_data.bill_number),
          bill_image: new FormControl(),
          supplier_id: new FormControl(result.data.bill_info_data.supplier.id),
          total_price: new FormControl(result.data.bill_info_data.total_price),
          paid_amount: new FormControl(result.data.bill_info_data.paid_amount),
          payment_method: new FormControl(result.data.bill_info_data.payment_method),
          transaction_id: new FormControl(result.data.bill_info_data.transaction_id),
          bill_date_transaction: new FormControl(this.calculateDate(result.data.bill_info_data.bill_date_transaction)),
          bill_date_purchase: new FormControl(this.calculateDate(result.data.bill_info_data.bill_date_purchase)),
          order_number: new FormControl(result.data.bill_info_data.order_number)

        });

        this.bill_id = result.data.id
        this.submitbutton = "update";
        this.headingAdd = " Edit Purchase "
        this.isUpdatePage = true;
      }, (error: any) => {
        console.log(error);

      })
    }
  }

  //ngSubmit bill add data - 
  addBill() {
    if (this.isUpdatePage) {
      console.log("Update bill api works");
      this.authservice.updateBillData(this.billSaveForm, this.selectedFiles).subscribe((result: any) => {
        Swal.fire(
          'Good job!',
          'Bill Updated sucessfully',
          'success'
        )
        console.log(result.data)
      })
    }
    else {
      console.log("add bill works");
      this.addBillPurchase(this.billSaveForm);
    }
  }

  addBillPurchase(billData: FormGroup) {
    this.authservice.addBillData(billData, this.selectedFiles).subscribe((result: any) => {
      console.log("Add bill api works");
      alert("Bill added sucessfully")
    })
  }

  // Bill image click event - 

  selectFile(event: any) {
    console.log(this.selectedFiles)
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles)
    this.billSaveForm.controls["bill_image"].setValue = this.selectedFiles
  }

  // supllier list api for bill list -
  getSupplierListApi() {
    this.authservice.getSupplierListApi().subscribe((result: any) => {
      console.log(result);
      this.SupplierList = result.data;
      console.log(this.SupplierList);
    }, (error: any) => {
      console.log(error);
    })
  }


}
