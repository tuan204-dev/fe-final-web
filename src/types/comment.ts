import { IUser } from "./user";

export interface IComment {
    _id: string;
    content: string;
    post: {
        _id: string
        title: string
        imageUrl: string
    };
    user: IUser
    createdAt: string;
    updatedAt: string;
}