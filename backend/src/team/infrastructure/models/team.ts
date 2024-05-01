import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import User from '#main/infrastructure/models/user';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @belongsTo(() => User)
  declare manager: BelongsTo<typeof User>

  @column()
  declare name: string;

  @column()
  declare : string;

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
