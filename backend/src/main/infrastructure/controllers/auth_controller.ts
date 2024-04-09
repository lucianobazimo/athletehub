import { HttpContext } from '@adonisjs/core/http'
import RegisterUserHandler from '#main/application/auth/RegisterUser/register_user_handler'
import RegisterUserRequest from '#main/application/auth/RegisterUser/register_user_request'
import { inject } from '@adonisjs/core'
import RegisterUserRequestValidator from '#main/infrastructure/validators/user/register_user_request.validator'
import LoginUserHandler from '#main/application/auth/LoginUser/login_user_handler'
import LoginUserRequest from '#main/application/auth/LoginUser/login_user_request'
import LoginUserRequestValidator from '#main/infrastructure/validators/user/login_user_request.validator'
import UserModel from '../models/user.js'

@inject()
export default class AuthController {
  constructor(
    private _registerUserHandler: RegisterUserHandler,
    private _loginUserHandler: LoginUserHandler
  ) {}

  async registerUser({ request }: HttpContext) {
    const payload = await request.validateUsing(RegisterUserRequestValidator.execute())
    const registerUserRequest = new RegisterUserRequest({ ...payload })

    const result = await this._registerUserHandler.execute(registerUserRequest)

    return { success: result.isOk(), message: result.error(), data: result.value().id }
  }

  async loginUser({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(LoginUserRequestValidator.execute())
    const loginUserRequest = new LoginUserRequest({
      email: payload.email,
      password: payload.password,
    })

    const result = await this._loginUserHandler.execute(loginUserRequest)

    if (result.isOk()) auth.use('web').login(result.value().user as UserModel)
    if (result.isFail()) response.status(403)

    return { success: result.isOk(), message: result.error(), data: auth.user?.id }
  }
}
