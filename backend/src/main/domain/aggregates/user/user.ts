import { Aggregate, Ok, Result } from 'rich-domain'
import { DateTime } from 'luxon'
import UserId from '#main/domain/aggregates/user/user_id'
import UserFirstname from '#main/domain/aggregates/user/user_firstname'
import UserLastname from '#main/domain/aggregates/user/user_lastname'
import UserUsername from '#main/domain/aggregates/user/user_username'
import UserEmail from '#main/domain/aggregates/user/user_email'
import UserPassword from '#main/domain/aggregates/user/user_password'

interface UserProps {
  id: UserId
  firstname: UserFirstname
  lastname: UserLastname
  username: UserUsername
  email: UserEmail
  password: UserPassword
  createdAt?: DateTime
  updatedAt?: DateTime
}

export default class User extends Aggregate<UserProps> {
  private constructor(props: UserProps) {
    super(props)
  }

  static create(props: UserProps): Result<User> {
    if (!props.createdAt) props.createdAt = DateTime.utc()
    if (!props.updatedAt) props.updatedAt = DateTime.utc()

    return Ok(new User(props))
  }

  static hydrate(props: UserProps): Result<User> {
    return Ok(new User(props))
  }
}
