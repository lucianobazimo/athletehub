import { UserRepository } from '#main/domain/repositories/user_repository'
import UserModel from '#main/infrastructure/models/user'
import User from '#main/domain/aggregates/user/user'
import { Ok, Result } from 'rich-domain'

export default class LucidUserRepository implements UserRepository {
  register(user: User): Result<Promise<string>> {
    const userObject = user.toObject()

    // TODO: check if a user exists with same credentials

    return Ok(
      UserModel.create({
        id: userObject.id,
        username: userObject.username,
        email: userObject.email,
        firstname: userObject.firstname,
        lastname: userObject.lastname,
        password: userObject.password,
      }).then((u) => u.id)
    )
  }
}
