import { Price } from "./price";

export interface ProductDetails{
    productName: string;
    averagePriceFromLastMonth:number;
    picture: string;
    prices: Price[];
}