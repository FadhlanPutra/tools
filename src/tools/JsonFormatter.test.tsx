import { describe, it, expect } from 'vitest';
import { formatJson } from './JsonFormatter';

describe('JsonFormatter', () => {
  it('should beautify correctly', () => {
    const input = '{"a":1}';
    expect(formatJson(input, 'beautify')).toBe('{\n  "a": 1\n}');
  });

  it('should minify correctly', () => {
    const input = '{\n  "a": 1\n}';
    expect(formatJson(input, 'minify')).toBe('{"a":1}');
  });

  it('should throw error on invalid json', () => {
    expect(() => formatJson('{"a":}', 'beautify')).toThrow();
  });
});
