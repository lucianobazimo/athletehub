import { BaseEvent } from '@adonisjs/core/events'
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  protected async makeEventsDispatchable() {
    BaseEvent.useEmitter(await this.app.container.make('emitter'))
  }

  async boot() {
    await this.makeEventsDispatchable()
  }
}
