import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from 'src/app/shared/models/brand';
import { IProduct } from 'src/app/shared/models/product';
import { IType } from 'src/app/shared/models/productType';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: false}) searchTerm: ElementRef;
  products!: IProduct[];
  categories!: IBrand[];
  types!: IType[];
  totalCount: number;
  shopParams: ShopParams;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ];
  
  constructor(private shopService: ShopService) {
      this.shopParams = shopService.getShopParams();
   }

  ngOnInit(): void {
   this.getProducts(true);
   this.getCategories();
  }

  getProducts(userCache = false){
    this.shopService.getProducts(userCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, (err: any) => {
      console.log(err);
    },() => {
      //final
    });
  }

  getCategories(){
    this.shopService.getAllCategories().subscribe(response => {
      this.categories = [{id: 0, name:'All'}, ...response];
    }, (err: any) => {
      console.log(err);
    },() => {
    });
  }


  onCategorySelected(categoryId: number){
    const params = this.shopService.getShopParams();
    params.categoryId = categoryId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChange(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber !== event){
        params.pageNumber = event;
        this.shopService.setShopParams(params);
        this.getProducts(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
