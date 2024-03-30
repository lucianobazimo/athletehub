import { Fail, Ok, Result, ValueObject } from 'rich-domain'

interface Props {
  email: string
}

export default class UserEmail extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  create({ email }: Props): Result<UserEmail> {
    if (!email) return Fail('Email cannot be null or empty')

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!expression.test(email)) return Fail('Email is not in the right format')

    return Ok(new UserEmail({ email }))
  }

  hydrate({ email }: Props): Result<UserEmail> {
    return Ok(new UserEmail({ email }))
  }
}
