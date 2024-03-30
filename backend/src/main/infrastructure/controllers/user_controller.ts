import { HttpContext } from '@adonisjs/core/http'
import RegisterUserHandler from '#main/application/user/RegisterUser/register_user_handler'
import RegisterUserRequest from '#main/application/user/RegisterUser/register_user_request'
import { inject } from '@adonisjs/core'

@inject()
export default class UserController {
  constructor(private _registerUserHandler: RegisterUserHandler) {}

  async registerUser({ request }: HttpContext) {
    // TODO: add validator for request payload

    const registerUserRequest = new RegisterUserRequest({
      ...(request.body() as any),
    })

    const result = await this._registerUserHandler.execute(registerUserRequest)

    return { success: result.isOk(), message: result.error(), data: result.value() }
  }
}
