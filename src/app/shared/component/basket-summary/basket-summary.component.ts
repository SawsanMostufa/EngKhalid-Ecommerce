import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrder, IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  @Input() items: IBasketItem[] | IOrderItem[] = [];
 
  @Input() isBasket = true;
  @Input() isOrdered = false;
  imageUrl = environment.imagesUrl + "Images/Products/";

  constructor() { }

  ngOnInit(): void {
    
      console.log('this.items',this.items);
  }

  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }

  removeBasketItem(item: IBasketItem){
    debugger
    this.remove.emit(item);
  }

}
