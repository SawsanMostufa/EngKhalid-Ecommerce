import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from 'src/app/shared/models/basket';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;

    this.basketTotals$ = this.basketService.basketTotal$;
   
  }

  removeBasketItem(item: IBasketItem){
    debugger
    this.basketService.removeItemFromBasket(item);
  }
  
  incrementItemQuantity(item: IBasketItem){
    debugger
    this.basketService.incrementItemQuantity(item);
  }
  
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
