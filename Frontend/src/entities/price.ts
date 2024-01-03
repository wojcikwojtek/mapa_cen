import { Rating } from "./rating";
import { UserComment } from "./userComment";

export interface Price {
    shopAddress: string;
    date: string;
    priceValue: number;
    ratings: Rating[];
    comments: UserComment[];
}