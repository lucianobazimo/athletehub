import { DateTime } from 'luxon'
import { Aggregate, Ok, Result } from 'rich-domain'
import TeamName from './team_name.js'
import TeamId from './team_id.js'
import TeamSport from './team_sport.js'

interface TeamProps {
  id: TeamId
  name: TeamName
  sport: TeamSport
  createdAt?: DateTime
  updatedAt?: DateTime
}

export default class Team extends Aggregate<TeamProps> {
  private constructor(props: TeamProps) {
    super(props)
  }

  static create(props: TeamProps): Result<Team> {
    if (!props.createdAt) props.createdAt = DateTime.utc()
    if (!props.updatedAt) props.updatedAt = DateTime.utc()

    return Ok(new Team(props))
  }

  static hydrate(props: TeamProps): Team {
    return new Team(props)
  }
}
