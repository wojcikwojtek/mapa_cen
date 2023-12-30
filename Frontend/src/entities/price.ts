import { Rating } from "./ratingDTO";

export interface Price {
    shopAddress: string;
    date: string;
    ratings: Rating[];
    comments: Comment[];
}