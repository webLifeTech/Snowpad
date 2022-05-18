import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrdersComponent } from './orders/orders.component';
import { AddEditProductComponent } from './product-list/add-edit-product/add-edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'product-list', component: ProductListComponent,
      },
      {
        path: 'product/:kay', component: AddEditProductComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
      {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
