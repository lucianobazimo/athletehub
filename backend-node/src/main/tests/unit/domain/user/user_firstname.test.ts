import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import { test } from '@japa/runner'

test.group('user firstname value object tests', () => {
  test('create user firstname should success', ({ expect }) => {
    const firstname = 'John'
    const firstnameResult = UserFirstname.create({ firstname })

    expect(firstnameResult.isOk()).toBeTruthy()
    expect(firstnameResult.value().get('firstname')).toBe(firstname)
  })

  test('create user firstname with empty string should fail', ({ expect }) => {
    const firstname = ''
    const firstnameResult = UserFirstname.create({ firstname })

    expect(firstnameResult.isFail()).toBeTruthy()
    const error = firstnameResult.error()
    expect(error).toBe('Firstname must have a length between 3 and 20')
  })

  test('create user firstname with more than 20 characters should fail', ({ expect }) => {
    const firstname = '*'.repeat(21)
    const firstnameResult = UserFirstname.create({ firstname })

    expect(firstnameResult.isFail()).toBeTruthy()
    const error = firstnameResult.error()
    expect(error).toBe('Firstname must have a length between 3 and 20')
  })
})
