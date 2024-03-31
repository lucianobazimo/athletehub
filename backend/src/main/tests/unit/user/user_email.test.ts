import UserEmail from '#main/domain/aggregates/user/user_email'
import { describe, expect, it } from '@jest/globals'

describe('user email', () => {
  it('create email should success', () => {
    const email = 'test@test.com'
    const emailResult = UserEmail.create({ email })
    expect(emailResult.value().get('email')).toBe(email)
  })

  it('create email without TLD should fail', () => {
    const email = 'test@test'
    const emailResult = UserEmail.create({ email })

    expect(emailResult.isFail()).toBeTruthy()
  })

  it('create email with bad TLD should failed', () => {
    const email = 'test@test.c'
    const emailResult = UserEmail.create({ email })
    expect(emailResult.isFail()).toBeTruthy()
  })
})
