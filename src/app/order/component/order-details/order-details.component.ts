import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private breadcrumbService: BreadcrumbService) 
    { 
      this.breadcrumbService.set('@OrderDetails', '');
    }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById(){
  debugger
    this.orderService.getOrderDetails(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe((order: IOrder) => {
        this.order = order;
        console.log(this.order);
        this.breadcrumbService.set('@OrderDetails', `Order #${order.id}`);
      }, err => {
        console.log(err.message);
      });
  }

}
