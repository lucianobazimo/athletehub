import UserUsername from '#main/domain/aggregates/user/user_username'
import { test } from '@japa/runner'

test.group('user username value object tests', () => {
  test('create user username should success', async ({ expect }) => {
    const username = 'johndoe'
    const usernameResult = UserUsername.create({ username })

    expect(usernameResult.isOk()).toBeTruthy()
    expect(usernameResult.value().get('username')).toBe(username)
  })

  test('create user username with empty string should fail', async ({ expect }) => {
    const username = ''
    const usernameResult = UserUsername.create({ username })

    expect(usernameResult.isFail()).toBeTruthy()
    expect(usernameResult.error()).toBe('Username must have a length between 3 and 20 characters')
  })

  test('create user username with empty string should fail', async ({ expect }) => {
    const username = ''
    const usernameResult = UserUsername.create({ username })

    expect(usernameResult.isFail()).toBeTruthy()
    expect(usernameResult.error()).toBe('Username must have a length between 3 and 20 characters')
  })

  test('create user username with more than 20 characters should fail', async ({ expect }) => {
    const username = '*'.repeat(21)
    const usernameResult = UserUsername.create({ username })

    expect(usernameResult.isFail()).toBeTruthy()
    expect(usernameResult.error()).toBe('Username must have a length between 3 and 20 characters')
  })
})
