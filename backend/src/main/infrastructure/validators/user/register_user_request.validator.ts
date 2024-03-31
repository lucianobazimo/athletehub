import vine from '@vinejs/vine'

export default class RegisterUserRequestValidator {
  static execute() {
    return vine.compile(
      vine.object({
        username: vine.string().trim(),
        firstname: vine.string().trim(),
        lastname: vine.string().trim(),
        email: vine.string().trim(),
        password: vine.string().trim(),
      })
    )
  }
}
