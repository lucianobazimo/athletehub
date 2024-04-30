import { UserRepository } from '#main/domain/repositories/user_repository';
import User from '#main/domain/aggregates/user/user';
import { Ok, Result } from 'rich-domain';

export default class TestUserRepository implements UserRepository {
  register(user: User): Promise<Result<string>> {
    const userObject = user.toObject();

    return Promise.resolve(Ok(userObject.id));
  }
}
