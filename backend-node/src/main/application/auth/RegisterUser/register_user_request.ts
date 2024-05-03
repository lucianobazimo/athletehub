interface RegisterUserRequestData {
  firstname: string
  username: string
  lastname: string
  email: string
  password: string
}

export default class RegisterUserRequest {
  firstname: string
  username: string
  lastname: string
  email: string
  password: string

  constructor(data: RegisterUserRequestData) {
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.username = data.username
    this.email = data.email
    this.password = data.password
  }
}
