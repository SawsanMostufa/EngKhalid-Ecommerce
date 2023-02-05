import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: OrderListComponent},
  {path: ':id', component: OrderDetailsComponent ,data:{breadcrumb:{alias: 'OrderDetails'}}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderRoutingModule { }
