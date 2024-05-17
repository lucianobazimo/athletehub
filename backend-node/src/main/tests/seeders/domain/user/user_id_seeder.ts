import UserId from '#main/domain/aggregates/user/user_id'

class Blueprint {
  Id: string

  constructor(id: string) {
    this.Id = id
  }
}

export default class UserIdSeeder {
  private _blueprint: Blueprint

  constructor(blueprint: Blueprint) {
    this._blueprint = blueprint
  }

  static basic(): UserIdSeeder {
    const id = crypto.randomUUID()
    const blueprint = new Blueprint(id)

    return new UserIdSeeder(blueprint)
  }

  withId(id: string): UserIdSeeder {
    this._blueprint.Id = id
    return this
  }

  get(): UserId {
    return UserId.hydrate({ id: this._blueprint.Id })
  }
}
