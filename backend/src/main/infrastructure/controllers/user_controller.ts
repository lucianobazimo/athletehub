import { HttpContext } from '@adonisjs/core/http'
import RegisterUserHandler from '#main/application/user/RegisterUser/register_user_handler'
import RegisterUserRequest from '#main/application/user/RegisterUser/register_user_request'
import { inject } from '@adonisjs/core'
import RegisterUserRequestValidator from '#main/infrastructure/validators/user/register_user_request.validator'

@inject()
export default class UserController {
  constructor(private _registerUserHandler: RegisterUserHandler) {}

  async registerUser({ request }: HttpContext) {
    const payload = await request.validateUsing(RegisterUserRequestValidator.execute())
    const registerUserRequest = new RegisterUserRequest({ ...payload })

    const result = await this._registerUserHandler.execute(registerUserRequest)

    return { success: result.isOk(), message: result.error(), data: result.value().id.value() }
  }
}
