import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { ShopComponent } from './component/shop/shop.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    ShopComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ],
  exports:[
    ProductItemComponent
  ]
})
export class ShopModule { }
