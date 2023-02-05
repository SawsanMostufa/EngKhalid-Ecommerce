import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from './component/checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './component/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './component/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './component/checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './component/checkout-success/checkout-success.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
