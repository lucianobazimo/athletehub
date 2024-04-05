import { UID } from 'rich-domain'

export default class RegisterUserResponse {
  id: UID<string>

  constructor(id: UID<string>) {
    this.id = id
  }
}
