import UserId from '#main/domain/aggregates/user/user_id';
import { describe, it, expect } from '@jest/globals';

describe('user id', () => {
  it('create userId should success', () => {
    const id = crypto.randomUUID();
    const userIdResult = UserId.create({ id });

    expect(userIdResult.value().get('id')).toBe(id);
  });

  it('create userId should success', () => {
    const userIdResult = UserId.create({ id: '' });

    expect(userIdResult.isFail()).toBeTruthy();
  });
});
