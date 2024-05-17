import UserId from '#main/domain/aggregates/user/user_id'
import { test } from '@japa/runner'

test.group('user id value object test', () => {
  test('create user id should success', async ({ expect }) => {
    const id = crypto.randomUUID()
    const idResult = UserId.create({ id })

    expect(idResult.isOk()).toBeTruthy()
    expect(idResult.value().get('id')).toBe(id)
  })

  test('create user id with empty string should fail', async ({ expect }) => {
    const id = ''
    const idResult = UserId.create({ id })

    expect(idResult.isFail()).toBeTruthy()
    const error = idResult.error()
    expect(error).toBe('Id must not be empty or null')
  })
})
