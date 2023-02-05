import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private chekcoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadDeliveryMethods();
  }

  loadDeliveryMethods(){
    this.chekcoutService.getDeliveryMethod().subscribe((response: IDeliveryMethod[]) => {
      this.deliveryMethods = response;
    }, err => {
      console.log(err);
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
