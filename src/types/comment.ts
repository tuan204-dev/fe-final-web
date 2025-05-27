import { IUser } from "./user";

export interface IComment {
    _id: string;
    content: string;
    postId: string;
    user: IUser
    createdAt: string;
    updatedAt: string;
}