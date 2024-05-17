import TeamSport, { TeamSportEnum } from '#team/domain/aggregates/team/team_sport'
import { describe, expect, it } from '@jest/globals'

describe('team sport value object test', () => {
  it('create team sport with valid enum value should success', () => {
    const sport = TeamSportEnum.Basketball
    const sportResult = TeamSport.create({ sport })

    expect(sportResult.isOk()).toBeTruthy()
    expect(sportResult.value().get('sport')).toBe(sport)
  })

  it('create team sport with an invalid enum value should fail', () => {
    const sport = 0
    const sportResult = TeamSport.create({ sport: sport as TeamSportEnum })

    expect(sportResult.isFail()).toBeTruthy()
    const error = sportResult.error()
    expect(error).toBe('Sport is not handle by the application')
  })
})
