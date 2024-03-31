import { Fail, Ok, UID, ValueObject } from 'rich-domain'

interface Props {
  id: string
}

export default class UserId extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  validation(value: string) {
    return UserId.isValidProps({ id: value })
  }

  static isValidProps({ id }: Props): boolean {
    return Boolean(id)
  }

  static create({ id }: Props) {
    if (!UserId.isValidProps({ id })) return Fail('Id must not be empty or null')

    return Ok(new UserId({ id }))
  }

  hydrate(id: UID) {
    // @ts-ignore
    return new Ok(new UserId({ id }))
  }
}
