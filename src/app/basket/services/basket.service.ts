import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Basket, IBasket, IBasketItem, IBasketTotals } from 'src/app/shared/models/basket';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { Size } from 'src/app/shared/models/size';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseURL = environment.baseUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shippingPrice = 20;
   mapedsize:any=[];
   total:number=0;

  constructor(private http: HttpClient,private toaster: ToastrService) { }

  addItemToBasket(item: IProduct,  quantity = 1){
    const itemToAdd: IBasketItem = this.mapPRoductItemToBasketItems(item, quantity);
   
    const basket = this.getCurrentBasketValue() ??  this.createBasket();
   
    basket.items = this.addOrUpdateItems(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
   
  }

  setBasket(basket: IBasket){
    localStorage.setItem('basket', JSON.stringify(basket)); 
    this.basketSource.next(basket);
    this.calculateTotals();

  }

  getBasket(){
    let cartLocalStorage = JSON.parse(localStorage.getItem('basket'));
    if(cartLocalStorage){
      this.basketSource.next(cartLocalStorage);
      this.calculateTotals();
    }
   
  }

  getCurrentBasketValue(){
  
    return JSON.parse(localStorage.getItem('basket'));
   
  }

  addOrUpdateItems(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
  
    const index = items.findIndex(i => i.productId === itemToAdd.productId);
    
    if(index === -1){
      itemToAdd.productSizes[0].quantity = quantity;
      

      items.push(itemToAdd);
      this.toaster.success("Product added in your basket");
    }
    else{

 const index2 = items[index].productSizes.findIndex(i => i.value === itemToAdd.productSizes[0].value);
 if(index2 === -1){
  itemToAdd.productSizes[0].quantity = quantity; 
  

  items[index].productSizes.push(itemToAdd.productSizes[0]);
  this.toaster.success("Product added in your basket");
}
else{
  if (items[index].productSizes[index2].quantity + quantity <= itemToAdd.productSizes[0].quantity) 
    {
  items[index].productSizes[index2].quantity +=  quantity;
  this.toaster.success("Product added in your basket");
    }
    else
    {
      this.toaster.error("Quantity request greater than in stock");
    }
  
}
      
    }
    return items;
  }
 totalprice(price:number, quantity: number){
    
     debugger
       this.total+=price*quantity;
       return this.total
  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(i => i.id === item.productId);
    basket.items[index].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(i => i.id === item.productId);
    if(basket.items[index].quantity > 1){
      basket.items[index].quantity--;
      this.setBasket(basket);
    }
    else{
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    let cartLocalStorage = this.getCurrentBasketValue();
    cartLocalStorage.items.forEach((element: any,index: any)=>{
      if(element.productId === item.productId){
        cartLocalStorage.items.splice(index,1);
      }
   });

   this.setBasket(cartLocalStorage);
  }

  deleteAllBasketItems(basket: IBasket) {
    this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem("basket");
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
  }

  deleteLocalBasket(){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket');
  }

  //========== Private methods
  private createBasket(): IBasket {
    const basket = new Basket();

    return basket;
  }

  private mapPRoductItemToBasketItems(item: IProduct, quantity: number): IBasketItem {
   
    return {
      productId: item.id,
      productName: item.name,
      productSizes:item.productSizes,
      // size:
      pictureUrl: item.pictureUrl,
      // quantity,

      category: item.category
    };

  }


  private calculateTotals(){
    debugger
   let subTotal=0;
    const basket = this.getCurrentBasketValue();
    basket.items.forEach(e => {
          e.productSizes.forEach(el2 => {
            subTotal += el2.price * el2.quantity;
          });
      
      
     });
    const shipping = this.shippingPrice;
    // const subTotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subTotal + shipping;
    this.basketTotalSource.next({shipping, total, subTotal});
  }

}
