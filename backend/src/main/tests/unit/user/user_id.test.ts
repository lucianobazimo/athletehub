import { test } from '@japa/runner'
import UserId from '#main/domain/aggregates/user/user_id'
import { Uid } from 'rich-domain'

test.group('user id', () => {
  test('create userId should success', async ({ assert }) => {
    const userId = UserId.create({ id: Uid() })

    assert.isOk(userId.value())
  })
})
