import { describe, it, expect } from 'vitest';
import { convertUnixToDate, convertDateToUnix } from './TimestampConverter';

describe('TimestampConverter', () => {
  it('should convert unix timestamp to date', () => {
    const res = convertUnixToDate(1749550000);
    expect(res.iso).toBe('2025-06-10T10:06:40.000Z');
  });

  it('should convert date to unix timestamp', () => {
    const ts = convertDateToUnix('2025-06-10T10:06:40Z')
    expect(ts).toBe(1749550000)
  });
});
