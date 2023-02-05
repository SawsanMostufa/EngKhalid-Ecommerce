import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() items: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {   
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  
  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }
  
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
