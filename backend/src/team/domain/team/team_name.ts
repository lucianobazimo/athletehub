import { Fail, Ok, Result, ValueObject } from 'rich-domain';

interface Props {
  name: string;
}

export default class TeamName extends ValueObject<Props> {
  private static readonly MAX_WIDTH = 50;
  private static readonly MIN_WIDTH = 3;

  private constructor(props: Props) {
    super(props);
  }

  validation(value: string): boolean {
    return TeamName.isValidProps({ name: value });
  }

  static isValidProps({ name }: Props): boolean {
    const { string } = this.validator;
    return string(name).hasLengthBetweenOrEqual(TeamName.MIN_WIDTH, TeamName.MAX_WIDTH);
  }

  static create({ name }: Props): Result<TeamName> {
    if (!this.isValidProps({ name }))
      return Fail(
        `Username must have a length between ${TeamName.MIN_WIDTH} and ${TeamName.MAX_WIDTH}`
      );

    return Ok(new TeamName({ name }));
  }

  static hydrate({ name }: Props): TeamName {
    return new TeamName({ name });
  }
}
