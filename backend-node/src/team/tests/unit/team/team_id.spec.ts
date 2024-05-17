import TeamId from '#team/domain/aggregates/team/team_id'
import { describe, it, expect } from '@jest/globals'

describe('team id value object test', () => {
  it('create team id should success', () => {
    const id = crypto.randomUUID()
    const idResult = TeamId.create({ id })

    expect(idResult.isOk()).toBeTruthy()
    expect(idResult.value().get('id')).toBe(id)
  })

  it('create team id with empty id should fail', () => {
    const id = ''
    const idResult = TeamId.create({ id })

    expect(idResult.isFail()).toBeTruthy()
    const error = idResult.error()
    expect(error).toBe('Id must not be empty or null')
  })
})
