import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { BasketModule } from '../basket/basket.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  exports:[
  ]
  
})
export class OrderModule { }
