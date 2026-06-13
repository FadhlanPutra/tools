import { describe, it, expect } from 'vitest';
import { generateUUID } from './UuidGenerator';

describe('UuidGenerator', () => {
  it('should generate a valid UUID v4', () => {
    const uuid = generateUUID();
    // UUID v4 format: 8-4-4-4-12 hex chars, with the 13th char being '4'
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should generate unique UUIDs', () => {
    const uuids = new Set();
    for (let i = 0; i < 100; i++) {
      uuids.add(generateUUID());
    }
    expect(uuids.size).toBe(100);
  });
});
