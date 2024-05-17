import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import { faker } from '@faker-js/faker'

class Blueprint {
  Firstname: string

  constructor(firstname: string) {
    this.Firstname = firstname
  }
}

export default class UserFirstnameSeeder {
  private _blueprint: Blueprint

  constructor(blueprint: Blueprint) {
    this._blueprint = blueprint
  }

  static basic(): UserFirstnameSeeder {
    const firstname = faker.person.firstName()

    return new UserFirstnameSeeder(new Blueprint(firstname))
  }

  withFirstname(firstname: string): UserFirstnameSeeder {
    this._blueprint.Firstname = firstname
    return this
  }

  get(): UserFirstname {
    return UserFirstname.hydrate({ firstname: this._blueprint.Firstname })
  }
}
