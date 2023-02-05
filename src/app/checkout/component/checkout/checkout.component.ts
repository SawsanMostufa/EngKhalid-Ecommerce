import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket, IBasketTotals } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  //createCheckoutForm
  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null,Validators.required],
        lastName: [null,Validators.required],
        street: [null,Validators.required],
        city: [null,Validators.required],
        state: [null,Validators.required],
        zipCode: [null,Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOfCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address => {
      if(address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    },err => {
      console.log(err);
    });
  }

}
