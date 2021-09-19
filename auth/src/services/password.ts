import { hash, compare } from 'bcrypt'
export class Password {
  static async toHash(password: string) {
    return await hash(password, 12)
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    return await compare(storedPassword, suppliedPassword)
  }
}
