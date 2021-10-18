import { hash } from 'bcrypt'
import { Model, model, Schema, Document } from 'mongoose'
import { Password } from '../services/password'

interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends Document {
  email: string
  password: string
  correctPassword(suppliedPassword: string): Promise<boolean>
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
}, {
  toJSON: {
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
    }
  }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.set('password', await Password.toHash(this.password))
  }
  next()
})

userSchema.methods.correctPassword = async function (
  suppliedPassword: string
): Promise<boolean> {
  return await Password.compare(suppliedPassword, this.password)
}

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}
export const User = model<UserDoc, UserModel>('User', userSchema)
