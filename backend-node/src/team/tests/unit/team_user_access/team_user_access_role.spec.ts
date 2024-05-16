import TeamUserAccessRole, {
  TeamUserAccessRoleEnum,
} from '#team/domain/team_user_access/team_user_access_role'
import { describe, expect, it } from '@jest/globals'

describe('team user access role', () => {
  it('create team user access role should success', () => {
    const role = TeamUserAccessRoleEnum.Manager
    const roleResult = TeamUserAccessRole.create({ role })

    expect(roleResult.isOk()).toBeTruthy()
    expect(roleResult.value().get('role')).toBe(TeamUserAccessRoleEnum.Manager)
  })
})
