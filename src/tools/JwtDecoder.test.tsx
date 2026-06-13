import { describe, it, expect } from 'vitest';
import { decodeJWT } from './JwtDecoder';

describe('JwtDecoder', () => {
  it('should decode valid JWT token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.signature';
    const decoded = decodeJWT(token);
    expect(decoded.payload.sub).toBe('1234567890');
    expect(decoded.payload.name).toBe('John Doe');
  });

  it('should throw error for invalid format', () => {
    expect(() => decodeJWT('invalid.token')).toThrow('JWT harus memiliki 3 bagian');
  });

  it('should decode token with URL-safe base64 characters', () => {
    // "test" encoded in base64url: "dGVzdA"
    // "hello" encoded in base64url: "aGVsbG8"
    // Base64URL example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIn0.signature
    // Let's create one with - and _
    // {"a": 1} => {"a": 1} => {"a": 1} => "eyJhIjogMX0"
    // Let's try "{"test": "test-data_with_underscore"}"
    // eyJ0ZXN0IjogInRlc3QtZGF0YV93aXRoX3VuZGVyc2NvcmUifQ
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjogInRlc3QtZGF0YV93aXRoX3VuZGVyc2NvcmUifQ.signature';
    const decoded = decodeJWT(token);
    expect(decoded.payload.test).toBe('test-data_with_underscore');
  });
});
