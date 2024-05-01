import UserModel from '#main/infrastructure/models/user';
import { HttpContext } from '@adonisjs/core/http';
import RegisterUserHandler from '#main/application/auth/RegisterUser/register_user_handler';
import RegisterUserRequest from '#main/application/auth/RegisterUser/register_user_request';
import { inject } from '@adonisjs/core';
import RegisterUserRequestValidator from '#main/infrastructure/validators/user/register_user_request.validator';
import LoginUserRequestValidator from '#main/infrastructure/validators/user/login_user_request.validator';

@inject()
export default class AuthController {
  constructor(private _registerUserHandler: RegisterUserHandler) {}

  async registerUser({ request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterUserRequestValidator.execute());
    const registerUserRequest = new RegisterUserRequest({ ...payload });

    const result = await this._registerUserHandler.execute(registerUserRequest);

    response.status(result.isOk() ? 200 : 400);
    return {
      success: result.isOk(),
      message: result.error(),
      data: result.value() ? result.value().id : null,
    };
  }

  async loginUser({ request, auth, response }: HttpContext) {
    console.log(request.body());
    const payload = await request.validateUsing(LoginUserRequestValidator.execute());

    const user = await UserModel.verifyCredentials(payload.email, payload.password);

    await auth.use('web').login(user);

    response.status(200);
    return { success: true, data: auth.user?.id };
  }

  async logoutUser({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout();
      response.status(200);
    } catch {
      response.status(500);
      return { success: false };
    }
  }
}
