import { UserRepository } from '#main/domain/repositories/user_repository'
import UserModel from '#main/infrastructure/models/user'
import User from '#main/domain/aggregates/user/user'
import { Fail, Ok, Result } from 'rich-domain'
import UserId from '#main/domain/aggregates/user/user_id'
import UserUsername from '#main/domain/aggregates/user/user_username'
import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import UserLastname from '#main/domain/aggregates/user/user_lastname'
import UserPassword from '#main/domain/aggregates/user/user_password'
import UserEmail from '#main/domain/aggregates/user/user_email'

export default class LucidUserRepository implements UserRepository {
  async register(user: User): Promise<Result<string>> {
    const userObject = user.toObject()

    const emailAlreadyRegistered = await UserModel.findBy('email', userObject.email)
    if (emailAlreadyRegistered) return Fail('Email already registered')

    const usernameAlreadyRegistered = await UserModel.findBy('username', userObject.username)
    if (usernameAlreadyRegistered) return Fail('Username already registered')

    const response = await UserModel.create({
      id: userObject.id,
      username: userObject.username,
      email: userObject.email,
      firstname: userObject.firstname,
      lastname: userObject.lastname,
      password: userObject.password,
    }).then((u) => u.id)

    return Ok(response)
  }

  async login({
    email,
    password,
  }: {
    email: UserEmail
    password: UserPassword
  }): Promise<Result<UserModel>> {
    const user = await UserModel.verifyCredentials(email.toObject(), password.toObject())

    if (!user) return Fail('User not found for the given credentials')

    return Ok(user)
  }

  async findUserByEmail(email: string): Promise<Result<User> | null> {
    const result = await UserModel.findBy('email', email)

    if (!result) return null

    return this.convertToAggregate(result)
  }

  private convertToAggregate(model: UserModel): Result<User> {
    const userId = UserId.hydrate({ id: model.id })
    const username = UserUsername.hydrate({ username: model.username })
    const firstname = UserFirstname.hydrate({ firstname: model.firstname })
    const lastname = UserLastname.hydrate({ lastname: model.lastname })
    const password = UserPassword.hydrate({ password: model.password })
    const email = UserEmail.hydrate({ email: model.email })

    return User.create({
      username: username.value(),
      firstname: firstname.value(),
      lastname: lastname.value(),
      password: password.value(),
      email: email.value(),
      id: userId.value(),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    })
  }
}
