import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  id: string
}

export default class TeamUserAccess extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: string) {
    return TeamUserAccess.isValidProps({ id: value })
  }

  static isValidProps({ id }: Props): boolean {
    return id.length > 0
  }

  static new(): Result<TeamUserAccess> {
    const id = crypto.randomUUID()

    return Ok(new TeamUserAccess({ id }))
  }

  static create({ id }: Props): Result<TeamUserAccess> {
    if (!TeamUserAccess.isValidProps({ id })) return Fail('Id must not be empty or null')

    return Ok(new TeamUserAccess({ id }))
  }

  static hydrate({ id }: Props): TeamUserAccess {
    return new TeamUserAccess({ id })
  }
}
