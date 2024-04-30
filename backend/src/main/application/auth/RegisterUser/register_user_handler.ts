import { Fail, IUseCase, Ok, Result } from 'rich-domain';
import RegisterUserRequest from '#main/application/auth/RegisterUser/register_user_request';
import RegisterUserResponse from '#main/application/auth/RegisterUser/register_user_response';
import { UserRepository } from '#main/domain/repositories/user_repository';
import UserId from '#main/domain/aggregates/user/user_id';
import UserUsername from '#main/domain/aggregates/user/user_username';
import UserLastname from '#main/domain/aggregates/user/user_lastname';
import UserFirstname from '#main/domain/aggregates/user/user_firstname';
import UserEmail from '#main/domain/aggregates/user/user_email';
import User from '#main/domain/aggregates/user/user';
import UserPassword from '#main/domain/aggregates/user/user_password';
import { DateTime } from 'luxon';
import { inject } from '@adonisjs/core';

@inject()
export class RegisterUserHandler
  implements IUseCase<RegisterUserRequest, Result<RegisterUserResponse>>
{
  private constructor(private _userRepository: UserRepository) {}

  async execute(data: RegisterUserRequest): Promise<Result<RegisterUserResponse>> {
    const userIdResult = UserId.create({ id: crypto.randomUUID() });
    if (userIdResult.isFail()) return Fail(userIdResult.error());

    const usernameResult = UserUsername.create({ username: data.username });
    if (usernameResult.isFail()) return Fail(usernameResult.error());

    const lastnameResult = UserLastname.create({ lastname: data.lastname });
    if (lastnameResult.isFail()) return Fail(lastnameResult.error());

    const firstnameResult = UserFirstname.create({ firstname: data.firstname });
    if (firstnameResult.isFail()) return Fail(firstnameResult.error());

    const emailResult = UserEmail.create({ email: data.email });
    if (emailResult.isFail()) return Fail(emailResult.error());

    const passwordResult = UserPassword.create({ password: data.password });
    if (passwordResult.isFail()) return Fail(passwordResult.error());

    const user = User.create({
      id: userIdResult.value(),
      username: usernameResult.value(),
      email: emailResult.value(),
      firstname: firstnameResult.value(),
      lastname: lastnameResult.value(),
      password: passwordResult.value(),
      updatedAt: DateTime.utc(),
      createdAt: DateTime.utc(),
    });
    
    const response = await this._userRepository.register(user.value());

    if (response.isFail()) return Fail(response.error());

    return Ok(new RegisterUserResponse(response.value()));
  }
}

export default RegisterUserHandler;
