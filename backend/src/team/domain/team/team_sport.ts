import { ValueObject } from 'rich-domain';

export enum TeamSportEnum {
  Football = 1,
  Handball = 2,
  Basketball = 3,
  Rugby = 4,
}

type TeamSportProps = {
  sport: TeamSportEnum;
};

export default class TeamSport extends ValueObject<TeamSportProps> {}
