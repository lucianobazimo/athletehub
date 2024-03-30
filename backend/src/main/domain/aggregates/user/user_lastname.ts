import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  lastname: string
}

export default class UserLastname extends ValueObject<Props> {
  private readonly MIN_LENGTH = 3
  private readonly MAX_LENGTH = 20

  private constructor(props: Props) {
    super(props)
  }

  create({ lastname }: Props): Result<UserLastname> {
    if (!lastname) return Fail('Lastname cannot be null or empty')

    if (lastname.length < this.MIN_LENGTH)
      return Fail(`Lastname must have at least ${this.MIN_LENGTH} characters`)
    if (lastname.length > this.MAX_LENGTH)
      return Fail(`Lastname must have less than ${this.MAX_LENGTH} characters`)

    console.log('hello')

    return Ok(new UserLastname({ lastname }))
  }
}
