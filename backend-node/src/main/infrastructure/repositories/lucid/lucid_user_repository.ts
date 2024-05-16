import { UserRepository } from '#main/domain/repositories/user_repository'
import UserModel from '#main/infrastructure/models/user'
import User from '#main/domain/aggregates/user/user'
import { Fail, Ok, Result } from 'rich-domain'

export default class LucidUserRepository implements UserRepository {
  async register(user: User): Promise<Result<string>> {
    const userObject = user.toObject()

    const emailAlreadyRegistered = await UserModel.findBy('email', userObject.email)
    if (emailAlreadyRegistered) return Fail('Email already registered')

    const usernameAlreadyRegistered = await UserModel.findBy('username', userObject.username)
    if (usernameAlreadyRegistered) return Fail('Username already registered')

    const response = await UserModel.create({
      id: String(userObject.id),
      username: String(userObject.username),
      email: String(userObject.email),
      firstname: String(userObject.firstname),
      lastname: String(userObject.lastname),
      password: String(userObject.password),
    }).then((res) => res.id)

    return Ok(response)
  }
}
