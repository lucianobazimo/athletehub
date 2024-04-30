import { BaseEvent } from '@adonisjs/core/events';
import { ApplicationService } from '@adonisjs/core/types';
import { UserRepository } from '#main/domain/repositories/user_repository';
import LucidUserRepository from '#main/infrastructure/repositories/lucid/lucid_user_repository';

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  protected async makeEventsDispatchable() {
    BaseEvent.useEmitter(await this.app.container.make('emitter'));
  }

  async boot() {
    await this.makeEventsDispatchable();

    this.app.container.bind(UserRepository, () => new LucidUserRepository());
  }
}
