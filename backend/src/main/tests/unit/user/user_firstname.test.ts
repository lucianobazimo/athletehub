import { test } from '@japa/runner'
import UserFirstname from '#main/domain/aggregates/user/user_firstname'

test.group('user firstname', () => {
  test('create userFirstname should success', async ({ assert }) => {
    const firstname = 'John'
    const firstnameResult = UserFirstname.create({ firstname })

    assert.isOk(firstnameResult.value())
  })

  test('create userFirstname should fail', async ({ assert }) => {
    const userFirstnameResult = UserFirstname.create({ firstname: '' })

    assert.isNotOk(userFirstnameResult.value())
  })
})
