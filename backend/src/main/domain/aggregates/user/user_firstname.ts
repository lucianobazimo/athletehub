import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  firstname: string
}

export default class UserFirstname extends ValueObject<Props> {
  private readonly MIN_LENGTH = 3
  private readonly MAX_LENGTH = 20

  private constructor(props: Props) {
    super(props)
  }

  create({ firstname }: Props): Result<UserFirstname> {
    if (!firstname) return Fail('Firstname cannot be null or empty')

    if (firstname.length < this.MIN_LENGTH)
      return Fail(`Lastname must have at least ${this.MIN_LENGTH} characters`)
    if (firstname.length > this.MAX_LENGTH)
      return Fail(`Lastname must have less than ${this.MAX_LENGTH} characters`)

    return Ok(new UserFirstname({ firstname }))
  }

  hydrate({ firstname }: Props): Result<UserFirstname> {
    return Ok(new UserFirstname({ firstname }))
  }
}
