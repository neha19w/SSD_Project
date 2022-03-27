import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-bill-add-purchase-list',
  templateUrl: './bill-add-purchase-list.component.html',
  styleUrls: ['./bill-add-purchase-list.component.css']
})
export class BillAddPurchaseListComponent implements OnInit {

  id: any;
  bill_id: any;
  isUpdatePage: any;
  batchNumber: any = '';
  headingAdd = "Add a Purchase in Purchase list"
  submitButton = "ADD THIS PRODUCT TO PURCHASE LIST"
  productName: any;
  selected_product_id: any
  selected_barcode: any



  value: any;
  selectedValue: any;
  public product_data: FormControl = new FormControl()
  public product_name_local: FormControl = new FormControl();
  billAddProdcutPurchaseForm = new FormGroup({
    bill_id: new FormControl(),
    product_id: new FormControl(),
    product_name: new FormControl(),
    barcode: new FormControl(),
    batch_number: new FormControl(),
    quantity: new FormControl(),
    purchase_price: new FormControl(),
    mfg_date: new FormControl(),
    exp_month: new FormControl(),
    exp_date: new FormControl(),
    mrp: new FormControl(),
    gst_type: new FormControl(),
    gst: new FormControl(),
    trade_discount_percentage: new FormControl(),
    trade_discount_price: new FormControl(),
    taxable_price: new FormControl(),
    selling_price: new FormControl(),
    free_product_name: new FormControl(),
    free_product_quantity: new FormControl(),
    default_margin: new FormControl(),
    margin_type: new FormControl(),
    default_price: new FormControl()
  });

  // onKeyUp function  for searching by Product name-

  // onKeyUpProductName(event: any) {
  //   console.log("search working")
  //   console.log(event.target.value);
  //   this.productName = event.target.value;

  // }

  calculateDate(milliSeconds: any): any {
    let date1 = new Date(Number(milliSeconds));
    // let time = date1.toLocaleTimeString();
    let date = this.datepipe.transform(date1, 'yyyy-MM-ddTHH:mm');
    return date
  };


  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) { }

  // date - 
  goToVotes($myParam: string = ''): void {
    const navigationDetails: string[] = ['/products'];
    if ($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  ngOnInit(): void {


    let id = this.route.snapshot.params.id;
    console.log("param id")
    console.log(id);

    let addflag = this.route.snapshot.params.addflag;

    console.log("id: -> " + String(id))
    console.log("addflag: -> " + String(addflag))

    if (id != null && !Boolean(addflag)) {
      console.log("BillAddPurchaseListComponent : id specific data is here");
      this.authservice.getProductPurchaseListApi(id).subscribe((result: any) => {
        console.log("id specific data is here");
        console.log(result.data);
        console.log(result.data[0].product.product_name);
        console.log(result.data[0].barcode.barcode);
        console.log(result.data[0].batch.batch_number);
        console.log("date");
        console.log(this.calculateDate(result.data[0].mfg_date));
        console.log(this.calculateDate(result.data[0].exp_date));
        this.billAddProdcutPurchaseForm = new FormGroup({
          product_name: new FormControl(result.data[0].product.product_name),
          barcode: new FormControl(result.data[0].barcode.barcode),
          batch_number: new FormControl(result.data[0].batch.batch_number),
          quantity: new FormControl(result.data[0].quantity),
          purchase_price: new FormControl(result.data[0].purchase_price),
          mfg_date: new FormControl(this.calculateDate(result.data[0].mfg_date)),
          exp_month: new FormControl(result.data[0].exp_month),
          exp_date: new FormControl(this.calculateDate(result.data[0].exp_date)),
          mrp: new FormControl(result.data[0].mrp),
          gst_type: new FormControl(result.data[0].gst_type),
          gst: new FormControl(result.data[0].gst),
          trade_discount_percentage: new FormControl(result.data[0].trade_discount_percentage),
          trade_discount_price: new FormControl(result.data[0].trade_discount_price),
          taxable_price: new FormControl(result.data[0].taxable_price),
          selling_price: new FormControl(result.data[0].selling_price),
          free_product_name: new FormControl(result.data[0].free_product_name),
          free_product_quantity: new FormControl(result.data[0].free_product_quantity),
          default_margin: new FormControl(result.data[0].default_margin),
          margin_type: new FormControl(result.data[0].margin_type),
          default_price: new FormControl(result.data[0].default_price)

        });

        this.bill_id = result.data.id
        this.headingAdd = "Edit a purchse in Purchase list"
        this.submitButton = "Edit THIS PRODUCT TO PURCHASE LIST"
        this.isUpdatePage = true;

      }, (error: any) => {
        console.log(error);

      })
    } else {
      this.billAddProdcutPurchaseForm.controls["bill_id"].setValue(Number(id))
      this.product_name_local.valueChanges
        .subscribe(() => {

          if (this.product_data.value != undefined) {
            console.log(this.product_data.value)
            this.selected_product_id = this.product_data.value.id
            if (this.product_data.value.master_product_barcode.length > 0) {
              this.selected_barcode = this.product_data.value.master_product_barcode[0].barcode
            }
          }

          this.getBillProductPurchaseListForSearch(this.product_name_local);

        });
    }
  }

  //ngSubmit bill add data - 
  addBillProductPurchaseSubmitData() {
    console.log("addBillProductPurchaseSubmitData function work");

    if (this.isUpdatePage) {
      console.log("Update bill api works");
      this.authservice.updateBillAddPurchaseListApi(this.billAddProdcutPurchaseForm).subscribe((result: any) => {
        Swal.fire(
          'Good job!',
          'Bill Updated sucessfully',
          'success'
        )
      })
    }

    else {
      console.log("add bill works")
      console.log(this.selected_product_id)
      console.log(this.selected_barcode)
      this.billAddProdcutPurchaseForm.controls["product_id"].setValue(this.selected_product_id)
      this.billAddProdcutPurchaseForm.controls["barcode"].setValue(Number(this.selected_barcode))
      this.billAddProdcutPurchaseForm.controls["batch_number"].setValue(this.batchNumber)
      this.addBillProductPurchaseData(this.billAddProdcutPurchaseForm);
    }
  }

  // add bill data purchase auth fucntion -
  addBillProductPurchaseData(billFormData: FormGroup) {
    this.authservice.addBillAddPurchaseListApi(billFormData).subscribe((result: any) => {
      console.log("Add api works");
      alert("Product added sucessfully")
      
    })
  }


  //get generate batch number bill list api - 
  getGenerateBatchNumberApi() {
    return this.authservice.getGenerateBatchNumberApi().subscribe((result: any) => {

      this.batchNumber = result.data;
      console.log(this.batchNumber);

    }, (error: any) => {
      console.log(error);

    })
  }


  //function for search product name -  
  getBillProductPurchaseListForSearch(value: any) {
    console.log("search text change ")
    console.log(value.value)
    if (value.value.length == 0)
      return

    this.authservice.getBillProductPurchaseListForSearch(value.value).subscribe((result: any) => {
      this.productName = result.data;
      console.log("search name - ");
      console.log(this.productName);

    }, (error: any) => {
      console.log(error);

    })
  }

  // redirect function for after submit all data this will redirect to bill page -

  // redirect(){
  //   this.router.navigate(['bill/:id']);
  // }
}


