import { Price } from "./price";

export interface ProductDetails{
    productName: string;
    picture: string;
    prices: Price[];
}