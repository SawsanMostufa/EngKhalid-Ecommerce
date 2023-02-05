import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList: IProduct[];

  constructor(private shopService:ShopService) {
   }

  ngOnInit(): void {
    this.getLatestProducts();
  }

  getLatestProducts(){
    this.shopService.getLatestProducts().subscribe(response => {
      this.productList = response;
      console.log(this.productList);
    }, (err: any) => {
      console.log(err);
    },() => {
     
    });
  }


}
