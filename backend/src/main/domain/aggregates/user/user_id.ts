import { Fail, Ok, Uid, UID, ValueObject } from 'rich-domain'

interface Props {
  id: UID
}

export default class UserId extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props)
  }

  new() {
    return Ok(new UserId({ id: Uid() }))
  }

  create(id: UID) {
    if (!id) return Fail('Id must not be empty or null')

    return Ok(new UserId({ id }))
  }

  hydrate(id: UID) {
    // @ts-ignore
    return new Ok(new UserId({ id }))
  }
}
