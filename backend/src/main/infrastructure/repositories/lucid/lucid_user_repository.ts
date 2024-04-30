import { UserRepository } from '#main/domain/repositories/user_repository';
import UserModel from '#main/infrastructure/models/user';
import User from '#main/domain/aggregates/user/user';
import { Fail, Ok, Result } from 'rich-domain';

export default class LucidUserRepository implements UserRepository {
  async register(user: User): Promise<Result<string>> {
    const userObject = user.toObject();

    const emailAlreadyRegistered = await UserModel.findBy('email', userObject.email);
    if (emailAlreadyRegistered) return Fail('Email already registered');

    const usernameAlreadyRegistered = await UserModel.findBy('username', userObject.username);
    if (usernameAlreadyRegistered) return Fail('Username already registered');

    const response = await UserModel.create({
      id: userObject.id,
      username: userObject.username,
      email: userObject.email,
      firstname: userObject.firstname,
      lastname: userObject.lastname,
      password: userObject.password,
    }).then((res) => res.id);

    return Ok(response);
  }
}
