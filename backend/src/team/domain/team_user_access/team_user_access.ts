import { DateTime } from 'luxon';
import { Aggregate, Ok, Result } from 'rich-domain';
import TeamUserAccessId from './team_user_access_id.js';

interface TeamUserAccessProps {
  id: TeamUserAccessId;
  createdAt: DateTime,
  updatedAt: DateTime,
}

export default class TeamUserAccess extends Aggregate<TeamUserAccessProps> {
  private constructor(props: TeamUserAccessProps) {
    super(props);
  }

  static create(props: TeamUserAccessProps): Result<TeamUserAccess> {
    if (!props.createdAt) props.createdAt = DateTime.utc();
    if (!props.updatedAt) props.updatedAt = DateTime.utc();

    return Ok(new TeamUserAccess(props));
  }

  static hydrate(props: TeamUserAccessProps): TeamUserAccess {
    return new TeamUserAccess(props);
  }
}
