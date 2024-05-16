import User from '#main/domain/aggregates/user/user'
import { Result } from 'rich-domain'

export abstract class UserRepository {
  abstract register(user: User): Promise<Result<string>>
}
