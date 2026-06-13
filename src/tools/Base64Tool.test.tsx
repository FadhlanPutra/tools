import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from './Base64Tool';

describe('Base64Tool', () => {
  it('should encode correctly', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ=');
  });

  it('should decode correctly', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ=')).toBe('hello world');
  });

  it('should throw error on invalid decode', () => {
    expect(() => decodeBase64('not-valid-base64===')).toThrow()
  });
});
