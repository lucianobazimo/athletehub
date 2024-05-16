import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  id: string
}

export default class TeamId extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: string) {
    return TeamId.isValidProps({ id: value })
  }

  static isValidProps({ id }: Props): boolean {
    return id.length > 0
  }

  static new(): Result<TeamId> {
    const id = crypto.randomUUID()

    return Ok(new TeamId({ id }))
  }

  static create({ id }: Props): Result<TeamId> {
    if (!TeamId.isValidProps({ id })) return Fail('Id must not be empty or null')

    return Ok(new TeamId({ id }))
  }

  static hydrate({ id }: Props): TeamId {
    return new TeamId({ id })
  }
}
