interface LoginUserRequestData {
  email: string
  password: string
}

export default class LoginUserRequest {
  email: string
  password: string

  constructor(data: LoginUserRequestData) {
    this.email = data.email
    this.password = data.password
  }
}
