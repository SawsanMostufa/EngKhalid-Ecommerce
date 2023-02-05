import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IOrderToCreate } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getDeliveryMethod(){
    return this.http.get(this.baseUrl + 'order/getDeliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a,b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderToCreate){
    return this.http.post(this.baseUrl + 'order/createOrder', order);
  }
}
