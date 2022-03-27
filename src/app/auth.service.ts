import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { URL } from './url.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpclient: HttpClient,
    private http: HttpClient) { }

  // login api - 
  login(data: any) {
    let url = "http://165.22.222.20/demo/shreesaidarshan/public/api/user-login";

    return this.httpclient.post(url, data)

  }

  // token get -
  getToken() {
    let data = localStorage.getItem('data');
    console.log("data - ");

    console.log(data);
    return data
  }

  // this will show all product list -  

  getProductList(filterData: any): Observable<any> {
    // console.log(filterData);

    console.log(" getProductList URL works ");
    console.log(`${URL.baseUrl}/product/list?name=${filterData.name}&category=${filterData.category}&page=${filterData.page}&limit=10`)
    return this.httpclient.get(`${URL.baseUrl}/product/list?name=${filterData.name}&category=${filterData.category}&page=${filterData.page}&limit=10`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    }
    );
  }

  //delete list api - 
  getDeleteList(id: number): Observable<any> {
    return this.httpclient.get(`${URL.baseUrl}/product/delete/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    }
    );
  }


  // category list api for selecting any one of them  - 
  getCategoryListApi() {
    return this.httpclient.get(`${URL.baseUrl}/category-list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }


  // nature list api  - 
  getNatureListApi() {
    return this.httpclient.get(`${URL.baseUrl}/warehouse/nature-list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }



  // Add Product Data - using parameter form and FormGroup where
  // FormData interface appends a new value onto an existing key inside a FormData object, 
  // or adds the key if it does not already exist.
  //  form controls - can hold both the data values and the validation


  addProductData(formdata: FormGroup) {
    console.log("product details value - ");

    console.log("here is product details : " + formdata.controls['product_detail'].value);
    console.log(formdata.controls['describtion'].value);
    //  first i create empty formData1 object:

    var formData1: any = new FormData();
    formData1.append("hsn", formdata.controls['hsn'].value);
    formData1.append("product_name", formdata.controls['product_name'].value);
    formData1.append("print_name", formdata.controls['print_name'].value);
    formData1.append("packing_type", formdata.controls['packing_type'].value);
    formData1.append("category", formdata.controls['category'].value);
    formData1.append("product_detail", formdata.controls['product_detail'].value);
    formData1.append("nature", formdata.controls['nature'].value);
    formData1.append("describtion", formdata.controls['describtion'].value);
    formData1.append("brand_name", formdata.controls['brand_name'].value);
    formData1.append("file", [formdata.controls['product_file'].value]);

    return this.httpclient.post(`${URL.baseUrl}/product/add-basic`, formData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }


  // edit Prodcut data - 

  editProductData(formdata: FormGroup, product_id: any) {

    console.log(formdata.controls['nature'].value);
    console.log("product details value - ");
    console.log(formdata.controls['product_detail'].value);
    var formData1: any = new FormData();
    formData1.append("hsn", formdata.controls['hsn'].value);
    formData1.append("product_id", product_id);
    formData1.append("product_name", formdata.controls['product_name'].value);
    formData1.append("print_name", formdata.controls['print_name'].value);
    formData1.append("packing_type", formdata.controls['packing_type'].value);
    formData1.append("category", formdata.controls['category'].value);
    formData1.append("nature", formdata.controls['nature'].value);
    formData1.append("describtion", formdata.controls['describtion'].value);
    formData1.append("product_detail", formdata.controls['product_detail'].value);
    formData1.append("brand_name", formdata.controls['brand_name'].value);

    return this.httpclient.post(`${URL.baseUrl}/product/edit`, formData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }

  //specific id for product edit 
  getIdSpecificProduct(id: any): Observable<any> {
    return this.httpclient.get(`${URL.baseUrl}/product/data-detail/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }

  // specific id for bill edit -
  getIdSpecificBill(id: any): Observable<any> {
    return this.httpclient.get(`${URL.baseUrl}/product/bill-info/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  // api nature list api  - 
  uploadfile(file: any) {
    return this.httpclient.post(`${URL.baseUrl}/warehouse/nature-list`, file, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`, 'Content-Type': 'file'
      }),
    });
  }


  //starting supplier list work from here - 

  //get all supplier list api - 
  getSupplierList() {
    console.log("get supplier list api - work");
    return this.httpclient.get(`${URL.baseUrl}/agency/list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenUrl}`,
      }),
    });
  }


  //get purchase list api  or get all bill list -- 
  getPurchaseList() {
    console.log("get purchase list api - work");
    return this.httpclient.get(`${URL.baseUrl}/product/bill-list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  //add bill details -
  addBillData(billData: FormGroup, file: File) {
    console.log("product details value - ");
    var billData1: any = new FormData();


    billData1.append("payment_status", billData.controls['payment_status'].value);
    billData1.append("bill_number", billData.controls['bill_number'].value);
    billData1.append("bill_image", file);
    billData1.append("supplier_id", billData.controls['supplier_id'].value);
    billData1.append("total_price", billData.controls['total_price'].value);
    billData1.append("paid_amount", billData.controls['paid_amount'].value);
    billData1.append("payment_method", billData.controls['payment_method'].value);
    billData1.append("transaction_id", billData.controls['transaction_id'].value);
    billData1.append("bill_date_transaction", billData.controls['bill_date_transaction'].value);
    billData1.append("bill_date_purchase", billData.controls['bill_date_purchase'].value);
    billData1.append("order_number", billData.controls['order_number'].value);
    console.log(billData)
    return this.httpclient.post(`${URL.baseUrl}/product/product-bill`, billData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  // edit bill data  - 
  updateBillData(billData: FormGroup, file: File) {
    console.log("product details value - ");
    var billData1: any = new FormData();

    billData1.append("id", billData.controls['id'].value);
    billData1.append("payment_status", billData.controls['payment_status'].value);
    billData1.append("bill_number", billData.controls['bill_number'].value);
    billData1.append("bill_image", file);
    billData1.append("supplier_id", billData.controls['supplier_id'].value);
    billData1.append("total_price", billData.controls['total_price'].value);
    billData1.append("paid_amount", billData.controls['paid_amount'].value);
    billData1.append("payment_method", billData.controls['payment_method'].value);
    billData1.append("transaction_id", billData.controls['transaction_id'].value);
    billData1.append("bill_date_transaction", billData.controls['bill_date_transaction'].value);
    billData1.append("bill_date_purchase", billData.controls['bill_date_purchase'].value);
    billData1.append("order_number", billData.controls['order_number'].value);
    console.log(billData)
    return this.httpclient.post(`${URL.baseUrl}/product/edit-bill`, billData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  // supllier list api for bill list -
  getSupplierListApi() {
    return this.httpclient.get(`${URL.baseUrl}/agency/list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  // delete  bill purchase list api -
  getDeletePurchaseListApi(id: number): Observable<any> {
    return this.httpclient.get(`${URL.baseUrl}/product/bill-delete/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    }
    );
  }

  //add bill data api - 
  addBillAddPurchaseListApi(billFormData: FormGroup) {

    console.log("addBillAddPurchaseListApi work");
    var billFormData1: any = new FormData();
    // billFormData1.append("product_name", billFormData.controls['product_name'].value);
    billFormData1.append("barcode", billFormData.controls['barcode'].value);
    billFormData1.append("product_id", billFormData.controls['product_id'].value);
    billFormData1.append("batch_number", billFormData.controls['batch_number'].value);
    billFormData1.append("quantity", billFormData.controls['quantity'].value);
    billFormData1.append("purchase_price", billFormData.controls['purchase_price'].value);
    billFormData1.append("mfg_date", billFormData.controls['mfg_date'].value);
    billFormData1.append("exp_month", billFormData.controls['exp_month'].value);
    billFormData1.append("exp_date", billFormData.controls['exp_date'].value);
    billFormData1.append("mrp", billFormData.controls['mrp'].value);
    billFormData1.append("gst_type", billFormData.controls['gst_type'].value);
    billFormData1.append("gst_no", billFormData.controls['gst'].value);
    // billFormData1.append("trade_discount_percentage", billFormData.controls['trade_discount_percentage'].value);
    // billFormData1.append("trade_discount_price", billFormData.controls['trade_discount_price'].value);
    billFormData1.append("taxable_price", billFormData.controls['taxable_price'].value);
    billFormData1.append("selling_price", billFormData.controls['selling_price'].value);
    // billFormData1.append("free_product_name", billFormData.controls['free_product_name'].value);
    // billFormData1.append("free_product_quantity", billFormData.controls['free_product_quantity'].value);
    billFormData1.append("default_margin", billFormData.controls['default_margin'].value);
    billFormData1.append("margin_type", billFormData.controls['margin_type'].value);
    billFormData1.append("default_price", billFormData.controls['default_price'].value);
    billFormData1.append("bill_id", billFormData.controls['bill_id'].value);
    console.log(billFormData1)
    console.log(billFormData)
    return this.httpclient.post(`${URL.baseUrl}/purchase/v1/add`, billFormData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  //update bill api - 

  updateBillAddPurchaseListApi(billFormData: FormGroup) {

    console.log("updateBillAddPurchaseListApi work");
    var billFormData1: any = new FormData();
    billFormData1.append("product_name", billFormData.controls['product_name'].value);
    billFormData1.append("barcode", billFormData.controls['barcode'].value);
    billFormData1.append("batch_number", billFormData.controls['batch_number'].value);
    billFormData1.append("quantity", billFormData.controls['quantity'].value);
    billFormData1.append("purchase_price", billFormData.controls['purchase_price'].value);
    billFormData1.append("mfg_date", billFormData.controls['mfg_date'].value);
    billFormData1.append("exp_month", billFormData.controls['exp_month'].value);
    billFormData1.append("exp_date", billFormData.controls['exp_date'].value);
    billFormData1.append("mrp", billFormData.controls['mrp'].value);
    billFormData1.append("gst_type", [billFormData.controls['gst_type'].value]);
    billFormData1.append("gst", billFormData.controls['gst'].value);
    billFormData1.append("trade_discount_percentage", billFormData.controls['trade_discount_percentage'].value);
    billFormData1.append("trade_discount_price", billFormData.controls['trade_discount_price'].value);
    billFormData1.append("taxable_price", billFormData.controls['taxable_price'].value);
    billFormData1.append("selling_price", billFormData.controls['selling_price'].value);
    billFormData1.append("free_product_name", billFormData.controls['free_product_name'].value);
    billFormData1.append("free_product_quantity", billFormData.controls['free_product_quantity'].value);
    billFormData1.append("default_margin", billFormData.controls['default_margin'].value);
    billFormData1.append("margin_type", billFormData.controls['margin_type'].value);
    billFormData1.append("default_price", [billFormData.controls['default_price'].value]);

    return this.httpclient.post(`${URL.baseUrl}/purchase/list?bill_id=`, billFormData1, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    });
  }

  //generate batch number bill list api - 
  getGenerateBatchNumberApi() {
    return this.httpclient.get(`${URL.baseUrl}/generate-batchnumber`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    })
  }


  // product purchase add list show get api - 
  getProductPurchaseListApi(bill_id: number) {
    return this.httpclient.get(`${URL.baseUrl}/purchase/list?bill_id=${bill_id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    })
  }

  // product purchase delete list show get api - 

  getDeleteProductPurchaseListApi(bill_id: number) {
    return this.httpclient.get(`${URL.baseUrl}/purchase/delete/${bill_id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    })
  }

//function for search product name -  
  getBillProductPurchaseListForSearch(name:any) {
    var formData1: any = new FormData();
    formData1.append("product_name", name);
    return this.httpclient.post(`${URL.baseUrl}/product-search`,formData1,{
     
      headers: new HttpHeaders({
        Authorization: `Bearer ${URL.apiTokenWUrl}`,
      }),
    })
  }
}
