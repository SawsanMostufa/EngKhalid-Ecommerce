// import { Size } from 'ngx-spinner/lib/ngx-spinner.enum';
import  { v4 as uuid4 } from 'uuid'
import { Size } from "./size";
export interface IBasket {
    id: string;
    items: IBasketItem[];
}

export interface IBasketItem {
    productId: number;
    productName: string;
    // size: string;
    productSizes:Size[];
 
    pictureUrl: string;
    category: string;
}

export class Basket implements IBasket{
    id = uuid4();
    items: IBasketItem[] = [];
   
}

export interface  IBasketTotals{
    shipping: number;
    subTotal: number;
    total: number
}
