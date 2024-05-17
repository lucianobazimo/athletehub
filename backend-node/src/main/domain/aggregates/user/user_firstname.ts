import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  firstname: string
}

export default class UserFirstname extends ValueObject<Props> {
  private static readonly MIN_LENGTH = 3
  private static readonly MAX_LENGTH = 20

  private constructor(props: Props) {
    super(props)
  }

  validation(value: string): boolean {
    return UserFirstname.isValidProps({ firstname: value })
  }

  static isValidProps({ firstname }: Props): boolean {
    const { string } = this.validator
    return string(firstname).hasLengthBetweenOrEqual(
      UserFirstname.MIN_LENGTH,
      UserFirstname.MAX_LENGTH
    )
  }

  static create({ firstname }: Props): Result<UserFirstname> {
    if (!this.isValidProps({ firstname })) {
      return Fail(
        `Firstname must have a length between ${UserFirstname.MIN_LENGTH} and ${UserFirstname.MAX_LENGTH}`
      )
    }

    return Ok(new UserFirstname({ firstname }))
  }

  static hydrate({ firstname }: Props): UserFirstname {
    return new UserFirstname({ firstname })
  }
}
