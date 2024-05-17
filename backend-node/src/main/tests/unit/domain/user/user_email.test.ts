import UserEmail from '#main/domain/aggregates/user/user_email'
import { test } from '@japa/runner'

test.group('user email value object tests', () => {
  test('create user email should success', async ({ expect }) => {
    const email = 'john@doe.com'
    const emailResult = UserEmail.create({ email })

    expect(emailResult.isOk()).toBeTruthy()
    expect(emailResult.value().get('email')).toBe(email)
  })

  test('create user email without TLD should fail', async ({ expect }) => {
    const email = 'john@doe'
    const emailResult = UserEmail.create({ email })

    expect(emailResult.isFail()).toBeTruthy()
    expect(emailResult.error()).toBe('Email must be of type john@doe.com')
  })

  test('create user email with the wrong format should fail', async ({ expect }) => {
    const email = 'johndoe.com'
    const emailResult = UserEmail.create({ email })

    expect(emailResult.isFail()).toBeTruthy()
    expect(emailResult.error()).toBe('Email must be of type john@doe.com')
  })
})
