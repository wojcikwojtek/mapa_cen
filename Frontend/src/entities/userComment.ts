export interface UserComment {
    username: string;
    date: string;
    content: string;
    picture: File | null;
}