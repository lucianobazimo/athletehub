import { test } from '@japa/runner'
import UserEmail from '#main/domain/aggregates/user/user_email'

test.group('user lastname', () => {
  test('create userLastname should success', async ({ assert }) => {
    const email = 'test@test.com'
    const firstnameResult = UserEmail.create({ email })

    assert.isOk(firstnameResult.value())
  })

  test('create userLastname should fail', async ({ assert }) => {
    const email = 'test@test'
    const userFirstnameResult = UserEmail.create({ email })

    assert.isNotOk(userFirstnameResult.value())
  })
})
