import User from '#main/domain/aggregates/user/user'
import UserUsername from '#main/domain/aggregates/user/user_username'
import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import UserLastname from '#main/domain/aggregates/user/user_lastname'
import UserEmail from '#main/domain/aggregates/user/user_email'
import UserPassword from '#main/domain/aggregates/user/user_password'
import UserId from '#main/domain/aggregates/user/user_id'
import { describe, it, expect } from '@jest/globals'

describe('user aggregate', () => {
  it('create user without username should fail', () => {
    const userId = UserId.create({ id: crypto.randomUUID() })
    const username = UserUsername.create({ username: '' })
    const firstname = UserFirstname.create({ firstname: 'John' })
    const lastname = UserLastname.create({ lastname: 'Doe' })
    const email = UserEmail.create({ email: 'test@test.com' })
    const password = UserPassword.create({ password: '12&Aqw34' })

    const user = User.create({
      id: userId.value(),
      username: username.value(),
      firstname: firstname.value(),
      lastname: lastname.value(),
      email: email.value(),
      password: password.value(),
    })

    expect(user).toBeNull()
  })
})
