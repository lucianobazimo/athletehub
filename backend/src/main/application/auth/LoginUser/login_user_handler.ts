import { IUseCase, Result, Fail, Ok } from 'rich-domain'
import { UserRepository } from '#main/domain/repositories/user_repository'
import { inject } from '@adonisjs/core'
import LoginUserRequest from '#main/application/auth/LoginUser/login_user_request'
import LoginUserResponse from '#main/application/auth/LoginUser/login_user_response'
import UserPassword from '#main/domain/aggregates/user/user_password'
import UserEmail from '#main/domain/aggregates/user/user_email'

@inject()
export default class LoginUserHandler
  implements IUseCase<LoginUserRequest, Result<LoginUserResponse>>
{
  private constructor(private _userRepository: UserRepository) {}

  async execute(data: LoginUserRequest): Promise<Result<LoginUserResponse>> {
    const emailResult = UserEmail.create({ email: data.email })
    if (emailResult.isFail()) return Fail(emailResult.error())

    const passwordResult = UserPassword.create({ password: data.password })
    if (passwordResult.isFail()) return Fail(passwordResult.error())

    const response = await this._userRepository.login({
      email: emailResult.value(),
      password: passwordResult.value(),
    })

    console.log(response)

    if (response.isFail()) return Fail(response.error())

    return Ok(new LoginUserResponse(response.isOk(), response.value()))
  }
}
