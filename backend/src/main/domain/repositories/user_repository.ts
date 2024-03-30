import User from '#main/domain/aggregates/user/user'

export abstract class UserRepository {
  abstract register(user: User): Promise<string>
}
