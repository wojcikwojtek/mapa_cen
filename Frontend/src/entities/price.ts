import { Rating } from "./rating";

export interface Price {
    shopAddress: string;
    date: string;
    priceValue: number;
    ratings: Rating[];
    comments: Comment[];
}