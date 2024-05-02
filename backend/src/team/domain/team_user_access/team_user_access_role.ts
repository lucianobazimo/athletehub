import { Fail, Ok, Result, ValueObject } from 'rich-domain';

export enum TeamUserAccessRoleEnum {
  Manager = 1,
  Player = 2,
  Staff = 3
}

type TeamUserAccessRoleProps = {
  role: TeamUserAccessRoleEnum;
};

export default class TeamUserAccess extends ValueObject<TeamUserAccessRoleProps> {
    private constructor(props: TeamUserAccessRoleProps) {
        super(props);
      }
    
      validation(value: TeamUserAccessRoleEnum) {
        return TeamUserAccess.isValidProps({ role: value });
      }
    
      static isValidProps({ role }: TeamUserAccessRoleProps): boolean {
        return Object.values(TeamUserAccessRoleEnum).includes(role as TeamUserAccessRoleEnum);
      }
    
      static create({ role }: TeamUserAccessRoleProps): Result<TeamUserAccess> {
        if (!TeamUserAccess.isValidProps({ role })) return Fail('Role must be in enum');
    
        return Ok(new TeamUserAccess({ role }));
      }
    
      static hydrate({ role }: TeamUserAccessRoleProps): TeamUserAccess {
        return new TeamUserAccess({ role });
      }
}
