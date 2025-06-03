import { IUser } from "./user"


export interface IPost {
    _id: string
    title: string
    imageUrl: string
    author?: IUser
    userId?: string
    likes?: string[]
    commentCount: number
    createdAt: string
    updatedAt: string
}