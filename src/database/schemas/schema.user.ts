import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

UserSchema.plugin(mongoosePaginate)