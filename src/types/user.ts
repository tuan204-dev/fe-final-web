export interface IUser {
    _id: string
    loginName: string
    avatar?: string
    firstName: string
    lastName: string
    location?: string
    description?: string
    occupation?: string
    createdAt: Date
    updatedAt: Date
}