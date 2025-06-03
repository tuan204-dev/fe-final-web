import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
    _id: string;
    content: string;
    post: IPost;
    user: IUser
    userId?: string
    createdAt: string;
    updatedAt: string;
}