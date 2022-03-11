import { Connection } from 'mongoose'
import { UserSchema } from '../database/schemas/schema.user'

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]