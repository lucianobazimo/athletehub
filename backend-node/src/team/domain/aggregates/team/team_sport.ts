import { Fail, Ok, Result, ValueObject } from 'rich-domain'

export enum TeamSportEnum {
  Football = 1,
  Handball = 2,
  Basketball = 3,
  Rugby = 4,
}

type Props = {
  sport: TeamSportEnum
}

export default class TeamSport extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: TeamSportEnum) {
    return TeamSport.isValidProps({ sport: value })
  }

  static isValidProps({ sport }: Props) {
    return Object.keys(TeamSportEnum).includes(String(sport))
  }

  static create({ sport }: Props): Result<TeamSport> {
    if (!TeamSport.isValidProps({ sport })) return Fail('Sport is not handle by the application')
    return Ok(new TeamSport({ sport }))
  }

  static hydrate({ sport }: Props): TeamSport {
    return new TeamSport({ sport })
  }
}
