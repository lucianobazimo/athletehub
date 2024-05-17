import UserLastname from '#main/domain/aggregates/user/user_lastname'
import { test } from '@japa/runner'

test.group('user lastname value object tests', () => {
  test('create user lastname should success', ({ expect }) => {
    const lastname = 'John'
    const lastnameResult = UserLastname.create({ lastname })

    expect(lastnameResult.isOk()).toBeTruthy()
    expect(lastnameResult.value().get('lastname')).toBe(lastname)
  })

  test('create user lastname with empty string should fail', ({ expect }) => {
    const lastname = ''
    const lastnameResult = UserLastname.create({ lastname })

    expect(lastnameResult.isFail()).toBeTruthy()
    const error = lastnameResult.error()
    expect(error).toBe('Lastname must have a length between 3 and 20')
  })

  test('create user lastname with more than 20 characters should fail', ({ expect }) => {
    const lastname = '*'.repeat(21)
    const lastnameResult = UserLastname.create({ lastname })

    expect(lastnameResult.isFail()).toBeTruthy()
    const error = lastnameResult.error()
    expect(error).toBe('Lastname must have a length between 3 and 20')
  })
})
