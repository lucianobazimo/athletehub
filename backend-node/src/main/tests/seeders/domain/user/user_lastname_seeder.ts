import UserLastname from '#main/domain/aggregates/user/user_lastname'
import { faker } from '@faker-js/faker'

class Blueprint {
  Lastname: string

  constructor(lastname: string) {
    this.Lastname = lastname
  }
}

export default class UserLastnameSeeder {
  private _blueprint: Blueprint

  constructor(blueprint: Blueprint) {
    this._blueprint = blueprint
  }

  static basic(): UserLastnameSeeder {
    const lastname: string = faker.person.lastName()

    return new UserLastnameSeeder(new Blueprint(lastname))
  }

  withLastname(lastname: string): UserLastnameSeeder {
    this._blueprint.Lastname = lastname
    return this
  }

  get(): UserLastname {
    return UserLastname.hydrate({ lastname: this._blueprint.Lastname })
  }
}
