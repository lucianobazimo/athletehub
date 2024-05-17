import UserEmail from '#main/domain/aggregates/user/user_email'
import { faker } from '@faker-js/faker'

class Blueprint {
  Email: string

  constructor(email: string) {
    this.Email = email
  }
}

export default class UserEmailSeeder {
  private _blueprint: Blueprint

  constructor(blueprint: Blueprint) {
    this._blueprint = blueprint
  }

  static basic(): UserEmailSeeder {
    const email = faker.internet.email()
    return new UserEmailSeeder(new Blueprint(email))
  }

  withEmail(email: string): UserEmailSeeder {
    this._blueprint.Email = email
    return this
  }

  get(): UserEmail {
    return UserEmail.hydrate({ email: this._blueprint.Email })
  }
}
