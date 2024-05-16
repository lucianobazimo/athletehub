import vine from '@vinejs/vine'

export default class LoginUserRequestValidator {
  static execute() {
    return vine.compile(
      vine.object({
        email: vine.string().email().trim(),
        password: vine.string().trim(),
      })
    )
  }
}
