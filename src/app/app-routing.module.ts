import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillAddPurchaseListComponent } from './bill-add-purchase-list/bill-add-purchase-list.component';
import { BillPurchaseListComponent } from './bill-purchase-list/bill-purchase-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPurchaseListComponent } from './product-purchase-list/product-purchase-list.component';
import { ProductsComponent } from './products/products.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { ViewListComponent } from './view-list/view-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'bill/:id', component: BillPurchaseListComponent },
  { path: 'bill', component: BillPurchaseListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'view-list', component: ViewListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'purchase-list', component: PurchaseListComponent },
  { path: 'bill-purchase-list', component: BillPurchaseListComponent },
  { path: 'supplier-list', component: SupplierListComponent },
  { path: 'bill-add-purchase-list/:id', component: BillAddPurchaseListComponent },
  { path: 'bill-add-purchase-list/:id/:addflag',  component: BillAddPurchaseListComponent },
  { path: 'bill-add-purchase-list', component: BillAddPurchaseListComponent },
  { path: 'product-purchase-list', component: ProductPurchaseListComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
