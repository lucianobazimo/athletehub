import { test } from '@japa/runner'
import UserLastname from '#main/domain/aggregates/user/user_lastname'

test.group('user lastname', () => {
  test('create userLastname should success', async ({ assert }) => {
    const lastname = 'John'
    const firstnameResult = UserLastname.create({ lastname })

    assert.isOk(firstnameResult.value())
  })

  test('create userLastname should fail', async ({ assert }) => {
    const userFirstnameResult = UserLastname.create({ lastname: '' })

    assert.isNotOk(userFirstnameResult.value())
  })
})
