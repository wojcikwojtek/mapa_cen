import { Rating } from "./rating";
import { UserComment } from "./userComment";

export interface Price {
    priceId:number;
    shopAddress: string;
    date: string;
    priceValue: number;
    upvotes:number;
    downvotes:number;
    ratings: Rating[];
    comments: UserComment[];
}