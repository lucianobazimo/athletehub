import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  id: string
}

export default class UserId extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: string) {
    return UserId.isValidProps({ id: value })
  }

  static isValidProps({ id }: Props): boolean {
    return id.length > 0
  }

  static create({ id }: Props): Result<UserId> {
    if (!UserId.isValidProps({ id })) return Fail('Id must not be empty or null')

    return Ok(new UserId({ id }))
  }

  static hydrate({ id }: Props): UserId {
    return new UserId({ id })
  }
}
