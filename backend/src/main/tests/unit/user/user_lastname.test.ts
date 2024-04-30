import UserLastname from '#main/domain/aggregates/user/user_lastname';
import { describe, expect, it } from '@jest/globals';

describe('user lastname', () => {
  it('create userLastname should success', () => {
    const lastname = 'John';
    const lastnameResult = UserLastname.create({ lastname });

    expect(lastnameResult.value().get('lastname')).toBe(lastname);
  });

  it('create empty userLastname should fail', () => {
    const lastnameResult = UserLastname.create({ lastname: '' });

    expect(lastnameResult.isFail()).toBeTruthy();
  });

  it('create userLastname with less than 3 characters should fail', () => {
    const lastname = 'Jo';
    const lastnameResult = UserLastname.create({ lastname });

    expect(lastnameResult.isFail()).toBeTruthy();
  });

  it('create userLastname with more than 20 characters should fail', () => {
    const lastname = 'John Doe John Doe John Doe John Doe';
    const lastnameResult = UserLastname.create({ lastname });

    expect(lastnameResult.isFail()).toBeTruthy();
  });
});
