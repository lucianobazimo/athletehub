import { DateTime } from 'luxon';
import { withAuthFinder } from '@adonisjs/auth';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Team from '#team/infrastructure/models/team';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import TeamUserAccess from '#team/infrastructure/models/team_user_access';

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

  @hasMany(() => Team)
  declare teams: HasMany<typeof Team>;

  @hasMany(() => TeamUserAccess)
  declare teamsUserAccesses: HasMany<typeof TeamUserAccess>
}
