import UserPassword from '#main/domain/aggregates/user/user_password'
import { test } from '@japa/runner'

test.group('user password value object tests', () => {
  test('create user password should success', async ({ expect }) => {
    const password = 'Testtest123&'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isOk()).toBeTruthy()
    expect(passwordResult.value().get('password')).toBe(password)
  })

  test('create user password without number should fail', async ({ expect }) => {
    const password = 'Testtest&'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isFail()).toBeTruthy()
    expect(passwordResult.error()).toBe(
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
  })

  test('create user password without uppercase should fail', async ({ expect }) => {
    const password = 'testtest123&'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isFail()).toBeTruthy()
    expect(passwordResult.error()).toBe(
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
  })

  test('create user password without lower case should fail', async ({ expect }) => {
    const password = 'TESTTEST123&'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isFail()).toBeTruthy()
    expect(passwordResult.error()).toBe(
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
  })

  test('create user password without special character should fail', async ({ expect }) => {
    const password = 'Testtest123'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isFail()).toBeTruthy()
    expect(passwordResult.error()).toBe(
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
  })

  test('create user password with less than 8 characters should fail', async ({ expect }) => {
    const password = 'Tet123&'
    const passwordResult = UserPassword.create({ password })

    expect(passwordResult.isFail()).toBeTruthy()
    expect(passwordResult.error()).toBe(
      'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
  })
})
