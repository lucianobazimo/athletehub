import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  password: string
}

export default class UserPassword extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  create({ password }: Props): Result<UserPassword> {
    if (!password) return Fail('Password cannot be null or empty')

    const expression: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (!expression.test(password))
      return Fail(
        'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      )

    return Ok(new UserPassword({ password }))
  }
}
