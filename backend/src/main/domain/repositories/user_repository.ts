import UserPassword from '#main/domain/aggregates/user/user_password'
import UserEmail from '#main/domain/aggregates/user/user_email'
import User from '#main/domain/aggregates/user/user'
import UserModel from '#main/infrastructure/models/user'
import { Result } from 'rich-domain'

export abstract class UserRepository {
  abstract register(user: User): Promise<Result<string>>
}
