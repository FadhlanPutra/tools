import { describe, it, expect } from 'vitest';
import { generatePassword } from './PasswordGenerator';

describe('PasswordGenerator', () => {
  it('should generate password of specified length', () => {
    const length = 20;
    const password = generatePassword(length, { upper: false, numbers: false, symbols: false });
    expect(password.length).toBe(length);
  });

  it('should include uppercase characters when option is true', () => {
    const password = generatePassword(50, { upper: true, numbers: false, symbols: false });
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/^[a-zA-Z]+$/);
  });

  it('should include numbers when option is true', () => {
    const password = generatePassword(50, { upper: false, numbers: true, symbols: false });
    expect(password).toMatch(/[0-9]/);
  });
});
