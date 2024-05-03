import UserModel from '#main/infrastructure/models/user'
import { HttpContext } from '@adonisjs/core/http'
import RegisterUserHandler from '#main/application/auth/RegisterUser/register_user_handler'
import RegisterUserRequest from '#main/application/auth/RegisterUser/register_user_request'
import { inject } from '@adonisjs/core'
import RegisterUserRequestValidator from '#main/infrastructure/validators/user/register_user_request.validator'
import LoginUserRequestValidator from '#main/infrastructure/validators/user/login_user_request.validator'

@inject()
export default class AuthController {
  constructor(private _registerUserHandler: RegisterUserHandler) {}

  async registerUser({ request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterUserRequestValidator.execute())
    const registerUserRequest = new RegisterUserRequest({ ...payload })

    const result = await this._registerUserHandler.execute(registerUserRequest)

    response.status(result.isOk() ? 200 : 400)
    return {
      success: result.isOk(),
      message: result.error(),
      data: result.value() ? result.value().id : null,
    }
  }

  async loginUser({ request }: HttpContext) {
    const payload = await request.validateUsing(LoginUserRequestValidator.execute())

    const user = await UserModel.verifyCredentials(payload.email, payload.password)
    // TODO!: optimize token management to prevent from overloading token table
    const token = await UserModel.accessTokens.create(user)
    return token
  }

  async logoutUser({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const tokens = await UserModel.accessTokens.all(auth.user!)
    const token = tokens.find((t) => !t.isExpired)

    if (!token) {
      response.status(400)
      return 'No user found for this token'
    }

    await UserModel.accessTokens.delete(user, token.identifier)
    return { success: true }
  }
}
