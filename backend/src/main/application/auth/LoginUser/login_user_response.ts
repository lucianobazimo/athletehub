import UserModel from '#main/infrastructure/models/user'

export default class LoginUserResponse {
  success: boolean
  user?: UserModel

  constructor(success: boolean, user?: UserModel) {
    this.success = success
    this.user = user
  }
}
