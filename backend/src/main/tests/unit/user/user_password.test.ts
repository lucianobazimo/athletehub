import UserPassword from '#main/domain/aggregates/user/user_password';
import { describe, expect, it } from '@jest/globals';

describe('user password', () => {
  it('create userPassword should success', () => {
    const password = '12&Aqw34';
    const passwordResult = UserPassword.create({ password });

    expect(passwordResult.value().get('password')).toBe(password);
  });

  it('create userPassword with less than 8 characters should fail', () => {
    const password = 'test';
    const passwordResult = UserPassword.create({ password });

    expect(passwordResult.isFail()).toBeTruthy();
  });

  it('create userPassword without uppercase should fail', () => {
    const password = 'testtest1';
    const passwordResult = UserPassword.create({ password });

    expect(passwordResult.isFail()).toBeTruthy();
  });

  it('create userPassword without special chars should fail', () => {
    const password = 'Testtest1';
    const passwordResult = UserPassword.create({ password });

    expect(passwordResult.isFail()).toBeTruthy();
  });

  it('create userPassword without numbers should fail', () => {
    const password = 'Testtest';
    const passwordResult = UserPassword.create({ password });

    expect(passwordResult.isFail()).toBeTruthy();
  });
});
