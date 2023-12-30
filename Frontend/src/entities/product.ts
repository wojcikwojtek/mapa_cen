import { Price } from "./price";

export interface Product{
    productName: string;
    picture: string;
    prices: Price[];
}