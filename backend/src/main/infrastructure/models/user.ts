import { DateTime } from 'luxon';
import { withAuthFinder } from '@adonisjs/auth';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column } from '@adonisjs/lucid/orm';

const AuthFinder = withAuthFinder(() => hash.use('argon'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare username: string;

  @column()
  declare firstname: string;

  @column()
  declare lastname: string;

  @column()
  declare email: string;

  @column()
  declare password: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
