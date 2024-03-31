import { test } from '@japa/runner'
import UserPassword from '#main/domain/aggregates/user/user_password'

test.group('user password', () => {
  test('create userPassword should success', async ({ assert }) => {
    const password = '12&Aqw34'
    const firstnameResult = UserPassword.create({ password })

    assert.isOk(firstnameResult.value())
  })

  test('create userPassword should fail', async ({ assert }) => {
    const password = 'test'
    const userFirstnameResult = UserPassword.create({ password })

    assert.isNotOk(userFirstnameResult.value())
  })
})
