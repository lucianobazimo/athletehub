import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  lastname: string
}

export default class UserLastname extends ValueObject<Props> {
  private static readonly MIN_LENGTH = 3
  private static readonly MAX_LENGTH = 20

  private constructor(props: Props) {
    super(props)
  }

  validation(value: string): boolean {
    return UserLastname.isValidProps({ lastname: value })
  }

  static isValidProps({ lastname }: Props) {
    const { string } = this.validator
    return string(lastname).hasLengthBetweenOrEqual(
      UserLastname.MIN_LENGTH,
      UserLastname.MAX_LENGTH
    )
  }

  static create({ lastname }: Props): Result<UserLastname> {
    if (!this.isValidProps({ lastname })) {
      return Fail(
        `Lastname must have a length between ${UserLastname.MIN_LENGTH} and ${UserLastname.MAX_LENGTH}`
      )
    }

    return Ok(new UserLastname({ lastname }))
  }

  static hydrate({ lastname }: Props): UserLastname {
    return new UserLastname({ lastname })
  }
}
