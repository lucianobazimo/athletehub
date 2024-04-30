import { Fail, Ok, Result, ValueObject } from 'rich-domain';

interface Props {
  password: string;
}

export default class UserPassword extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static isValidProps({ password }: Props) {
    const expression: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return expression.test(password);
  }

  static create({ password }: Props): Result<UserPassword> {
    if (!UserPassword.isValidProps({ password }))
      return Fail(
        'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      );

    return Ok(new UserPassword({ password }));
  }

  static hydrate({ password }: Props): Result<UserPassword> {
    return Ok(new UserPassword({ password }));
  }
}
