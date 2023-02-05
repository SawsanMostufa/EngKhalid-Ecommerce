import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public cartItemList = new BehaviorSubject<any>([]);
  baseUrl = 'http://localhost:40029/api/';

  constructor(private alert: ToastrService,
    private http: HttpClient) { }
  getProducts(): Observable<any>{
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if(cartLocalStorage){
      this.cartItemList.next(cartLocalStorage);
      return this.cartItemList.asObservable();
    }
    else{
      return this.cartItemList.asObservable();
    }
  }

  setProduct(data: any){
    localStorage.setItem('cart', JSON.stringify(data)); 
  }

  addToCart(product: any, qty: any){
    if(this.checkItemInCart(product)){
      this.alert.error("This item already exsist in your cart!"); 
      return;      
    }

    let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if(cartLocalStorage){
      product.qty = +qty;
      const newData = [...cartLocalStorage, product];
      this.setProduct(newData);
    }
    else{
      const newData = [];
      product.qty = +qty;
      newData.push(product);
      this.setProduct(newData);
    }

    this.cartItemList.next(JSON.parse(localStorage.getItem('cart')));     
    this.alert.success("The product has been successfully added to your cart")

  }

  checkItemInCart(product: any): boolean{
    let found = false;
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if(cartLocalStorage){
      cartLocalStorage.forEach(element => {
        if(element.id == product.id){  
          found = true;
        }
      });  
    }
    return found;
  }
  
  getTotalPrice(): number{
    let total = 0;
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if(cartLocalStorage){
        cartLocalStorage.map((a: any) =>{
        total += a.price * a.qty;
      });
    }
    return total;
  }

  removeCartItem(product: any){
    let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    cartLocalStorage.map((a: any, index: any) => {
      if(product.id == a.id){
        cartLocalStorage.splice(index, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartLocalStorage)); 
    this.cartItemList.next(cartLocalStorage);
  }

  removeAllCart(){
    this.cartItemList.next([]);
    localStorage.removeItem('cart');
  }

}
