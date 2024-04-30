import { Fail, Ok, Result, ValueObject } from 'rich-domain';

interface Props {
  username: string;
}

export default class UserUsername extends ValueObject<Props> {
  private static readonly MAX_WIDTH = 20;
  private static readonly MIN_WIDTH = 3;

  private constructor(props: Props) {
    super(props);
  }

  validation(value: string): boolean {
    return UserUsername.isValidProps({ username: value });
  }

  static isValidProps({ username }: Props): boolean {
    const { string } = this.validator;
    return string(username).hasLengthBetweenOrEqual(UserUsername.MIN_WIDTH, UserUsername.MAX_WIDTH);
  }

  static create({ username }: Props): Result<UserUsername> {
    if (!this.isValidProps({ username }))
      return Fail(
        `Username must have a length between ${UserUsername.MIN_WIDTH} and ${UserUsername.MAX_WIDTH}`
      );

    return Ok(new UserUsername({ username }));
  }

  static hydrate({ username }: Props): Result<UserUsername> {
    return Ok(new UserUsername({ username }));
  }
}
