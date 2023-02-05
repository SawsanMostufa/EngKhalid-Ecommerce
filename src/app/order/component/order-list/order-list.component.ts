import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = [];
  
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe((orders: any[]) => {
      this.orders = orders;
      console.log(this.orders);
    }, err => {
      console.log(err.message);
    });
  }

  goToOrderDetails(order){
    this.router.navigate(['orders/', + order.id] );
  }

}
