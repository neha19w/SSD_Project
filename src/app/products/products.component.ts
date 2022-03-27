import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  id: any;
  submitbutton: any = "Create Product";
  selectedCategory: any;
  product_id: any;
  isUpdatePage = false
  categoryList: any;
  natureList: any;
  selectedFile: any;
  imageUrl: any = "/assets/img/imageShriSaiDarshan.png";


  //form control & form group -  both are forms attributes 
  // form control - holds data and value .
  // form group - bhot sare  form control se milker bna hota hai ..

  product_save_form = new FormGroup({

    hsn: new FormControl(),
    product_name: new FormControl(),
    describtion: new FormControl(),
    product_file: new FormControl(),
    packing_type: new FormControl(),
    print_name: new FormControl(),
    brand_name: new FormControl(),
    category: new FormControl(),
    nature: new FormControl(),
    product_detail: new FormControl()

  });

  constructor(private authservice: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryListApi();
    this.getNatureListApi();
    let id = this.route.snapshot.params.id;
    console.log("param id")
    console.log(id);
    // routeParam - scontains information about the active route at that particular moment in time
    // this.product_save_form.controls['product_name'].value="neha"

    // page Update  - 

    if (id != null) {
      this.authservice.getIdSpecificProduct(id).subscribe((result: any) => {
        console.log("id specific data is here");
        console.log(result.data);

        this.product_save_form = new FormGroup({

          hsn: new FormControl(result.data.hsn),
          product_name: new FormControl(result.data.product_name),
          describtion: new FormControl(result.data.describtion),
          packing_type: new FormControl(result.data.packing_type),
          print_name: new FormControl(result.data.print_name),
          brand_name: new FormControl(result.data.brand_name),
          category: new FormControl(result.data.category),
          product_detail: new FormControl(result.data.product_detail),
          nature: new FormControl(result.data.nature)

        });
        this.product_id = result.data.id
        this.submitbutton = "update";
        this.isUpdatePage = true;
      }, (error: any) => {
        console.log(error);

      })
    }

  }

  // Form groups wrap a collection of form controls.
  // FormGroup is used with FormControl - to track the value and validate the state of form control. 

  on_create() {

    console.log("All Data - ");
    console.log(this.product_save_form.value);
    // this.product_save_form.patchValue({category:this.selectedCategory});
    // this.product_save_form.controls['category'].patchValue(this.selectedCategory);
    if (!this.isUpdatePage) {
      this.addProduct(this.product_save_form)
    }
    else {
      //update api
      this.authservice.editProductData(this.product_save_form, this.product_id).subscribe((result: any) => {
        alert("Product edited sucessfully")
      })

    }
  }

  
  addProduct(formdata: FormGroup) {
    this.authservice.addProductData(formdata).subscribe((result: any) => {
      console.log("Add api works");
      alert("Product added sucessfully")
    })
  }


  getCategoryListApi() {
    this.authservice.getCategoryListApi().subscribe((result: any) => {
      console.log(result);
      this.categoryList = result.data;
      console.log(this.categoryList);
    }, (error: any) => {
      console.log(error);

    })
  }

  getNatureListApi() {
    this.authservice.getNatureListApi().subscribe((result: any) => {
      console.log(result);
      this.natureList = result.data;
      console.log(this.natureList)
    }, (error: any) => {
      console.log(error);

    })
  }

  multiImageUrl: any = [];
  onImageAdd(event: any) {
    console.log("multi image changes inside for loop -  ");

    if (event.target.files) {
      for (let i = 0; i <= File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events: any) => {
          this.multiImageUrl.push(events.target.result);
          this.imageUrl = this.multiImageUrl;
        }
      }
      console.log("images");
      console.log(this.multiImageUrl);
    }
  }

  // onImageDelete(event: any) {
  //   this.multiImageUrl.splice(event.target.result);
  // }
  // // this will add one image -

  // onImageAdd(event: any) {
  //   console.log("image  -");
  //   console.log(event)
  //   this.selectedFile = <File>event.target.files[0];
  //   console.log(this.selectedFile)
  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.selectedFile);
  //   // this.onUpload()

  // }

  // onUpload() {
  //   this.authservice.uploadfile(this.selectedFile).subscribe((result: any) => {
  //     this.product_save_form.controls['product_file'].patchValue([result]);
  //   }, (error: any) => {
  //     console.log(error);

  //   })
  //   // api call 

  // }

}
