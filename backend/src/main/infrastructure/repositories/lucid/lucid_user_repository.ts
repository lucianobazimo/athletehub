import { UserRepository } from '#main/domain/repositories/user_repository'
import UserModel from '#main/infrastructure/models/user'
import User from '#main/domain/aggregates/user/user'

export default class LucidUserRepository implements UserRepository {
  async register(user: User): Promise<string> {
    const userObject = user.toObject()

    return Promise.resolve('test')
    // return UserModel.create({
    //   id: userObject.id,
    //   username: userObject.username,
    //   email: userObject.email,
    //   firstname: userObject.firstname,
    //   lastname: userObject.lastname,
    //   password: userObject.password,
    // }).then((u) => u.id)
  }
}
