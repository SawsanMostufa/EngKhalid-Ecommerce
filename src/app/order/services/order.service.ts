import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrder } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) 
  { }

  getOrders(){
    return this.http.get<any[]>(this.baseUrl + 'order/getOrdersForCurrentUser');
  }

  getOrderDetails(orderId: number){
    return this.http.get<IOrder>(this.baseUrl + 'order/getOrderDetails/'+ orderId);
  }

}
