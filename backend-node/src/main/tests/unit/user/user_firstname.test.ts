import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import { describe, expect, it } from '@jest/globals'

describe('user firstname', () => {
  it('create userFirstname should success', () => {
    const firstname = 'John'
    const firstnameResult = UserFirstname.create({ firstname })

    expect(firstnameResult.isOk()).toBeTruthy()
    expect(firstnameResult.value().get('firstname')).toBe(firstname)
  })

  it('create userFirstname with empty string should fail', () => {
    const userFirstnameResult = UserFirstname.create({ firstname: '' })

    expect(userFirstnameResult.isFail()).toBeTruthy()
  })

  it('create userFirstname with less than 3 characters should fail', () => {
    const firstname = 'Lu'
    const userFirstnameResult = UserFirstname.create({ firstname })

    expect(userFirstnameResult.isFail()).toBeTruthy()
  })

  it('create userFirstname with more than 20 characters should fail', () => {
    const firstname = 'John Doe John Doe John Doe John Doe'
    const userFirstnameResult = UserFirstname.create({ firstname })

    expect(userFirstnameResult.isFail()).toBeTruthy()
  })
})
