import TeamName from '#team/domain/aggregates/team/team_name'
import { describe, it, expect } from '@jest/globals'

describe('team name value object test', () => {
  it('create team name should sucess', () => {
    const name = 'MUC Handball'
    const nameResult = TeamName.create({ name })

    expect(nameResult.isOk()).toBeTruthy()
    expect(nameResult.value().get('name')).toBe(name)
  })

  it('create team name with less than 3 characters should fail', () => {
    const name = ''
    const nameResult = TeamName.create({ name })

    expect(nameResult.isFail()).toBeTruthy()
    const error = nameResult.error()
    expect(error).toBe('Username must have a length between 3 and 50')
  })

  it('create team name with more than 50 characters should fail', () => {
    const name = '*'.repeat(51)
    const nameResult = TeamName.create({ name })

    expect(nameResult.isFail()).toBeTruthy()
    const error = nameResult.error()
    expect(error).toBe('Username must have a length between 3 and 50')
  })
})
