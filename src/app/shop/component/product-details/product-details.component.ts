import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Size } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  SizeId:number;
  Sizevalue:any;
  price:any;
  discount:number;
  defaultprice:number=0;
 sizeobj:any={};
 mapped:any=[];
  image = environment.imagesUrl + "Images/Products/";

  constructor(private shopService: ShopService,
              private activateRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService,
              private toaster: ToastrService) 
    {
      this.bcService.set('@productDetails','');
     }

  ngOnInit(): void {
    this.loadProduct();

  }

  loadProduct(){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(response => {
      this.product = response;
      this.bcService.set('@productDetails', this.product.name);
    }, err => {
      console.log(err.error);
    },() => {
    });
  }
  
  addItemToBasket(){
    debugger
    this.shopService.checkProductQtyAva(this.product.id, this.quantity,this.Sizevalue?this.Sizevalue[0].value:this.product.productSizes[0].value)
    .subscribe((response: any) => {
      debugger
      if(this.defaultprice==0){
        this.sizeobj=this.product.productSizes[0]; 
        this.mapped[0] =this.sizeobj;
        this.Sizevalue=this.mapped;
      }
       this.product.productSizes=this.Sizevalue;
      setTimeout(() => {
        if(response.message == "Quantity not available in stock" && response.status == false){
          this.toaster.error("Quantity not available in stoxck");
        }
        if(response.message == "Quantity request greater than in stock" && response.status == false){
          this.toaster.error("Quantity request greater than in stock");
        }
        if(response.message == "Quantity available" && response.status == true){
          this.basketService.addItemToBasket(this.product, this.quantity);
        }
      }, 50);
    }, (err: any) => {
      setTimeout(() => {
        this.toaster.error("Server response error");
      }, 50);
    }, () => {
      //final
    });
    
  }
  incrementQuantity(item: IBasketItem){
    this.quantity++;
  }
  
  decrementQuantity(item: IBasketItem){
    if(this.quantity > 1){
      this.quantity--;
    }
  }
  onChange(Value) {
   this.Sizevalue=this.product.productSizes.filter(siz => siz.value === Value);
  
   this.price= this.Sizevalue[0].price;
   this.discount= this.Sizevalue[0].discount;
 
   this.defaultprice=1;
  
}

}
