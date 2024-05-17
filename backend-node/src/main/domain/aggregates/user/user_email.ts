import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  email: string
}

export default class UserEmail extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: string) {
    return UserEmail.isValidProps({ email: value })
  }

  static isValidProps({ email }: Props) {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return expression.test(email)
  }

  static create({ email }: Props): Result<UserEmail> {
    if (!UserEmail.isValidProps({ email })) return Fail('Email must be of type john@doe.com')
    return Ok(new UserEmail({ email }))
  }

  static hydrate({ email }: Props): UserEmail {
    return new UserEmail({ email })
  }
}
