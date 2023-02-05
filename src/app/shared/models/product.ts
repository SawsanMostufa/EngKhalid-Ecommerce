import { Size } from "./size";

export interface IProduct {
    id: number;
    name: string;
    description: string;
  
    pictureUrl: string;
    category: string;
  
    productSizes:Size[];
}