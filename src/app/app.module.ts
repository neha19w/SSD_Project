import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewListComponent } from './view-list/view-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { AdminNovComponent } from './admin-nov/admin-nov.component';
import { HomeComponent } from './home/home.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { BillPurchaseListComponent } from './bill-purchase-list/bill-purchase-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { BillAddPurchaseListComponent } from './bill-add-purchase-list/bill-add-purchase-list.component';
import { DatePipe } from '@angular/common';
import { ProductPurchaseListComponent } from './product-purchase-list/product-purchase-list.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// import { MatToolbarModule, , MatSidenavModule, MatListModule } from  '@angular/material';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MdbNavBar} from './mdb-nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    LoginComponent,
    ViewListComponent,
    HeaderComponent,
    AdminNovComponent,
    HomeComponent,
    PurchaseListComponent,
    BillPurchaseListComponent,
    SupplierListComponent,
    BillAddPurchaseListComponent,
    ProductPurchaseListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgxMatSelectSearchModule,  
    // MdbNavBar
    // MatToolbarModule,
    // MatIconModule,
    // MatSidenavModule,
    // MatListModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
