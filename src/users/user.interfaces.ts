import { Document } from 'mongoose';


export interface User extends Document {
   readonly username: string
   readonly email: string
   password: string
   readonly userId?: any
}

export type FindUserType =  {
   username?: string
   email?: string
}