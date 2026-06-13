import { describe, it, expect, vi } from 'vitest';
import { calculateStats } from './WordCounter';

vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: vi.fn(),
}))

describe('WordCounter', () => {
  it('should calculate stats correctly', () => {
    const text = 'Hello world. This is a test!';
    const stats = calculateStats(text);
    expect(stats.words).toBe(6);
    expect(stats.characters).toBe(28);
    expect(stats.sentences).toBe(2);
  });

  it('should handle empty text', () => {
    const stats = calculateStats('');
    expect(stats.words).toBe(0);
    expect(stats.characters).toBe(0);
    expect(stats.sentences).toBe(0);
  });

  it('should handle multiple newlines', () => {
    const text = 'Hello\n\nworld';
    const stats = calculateStats(text);
    expect(stats.words).toBe(2);
    expect(stats.characters).toBe(12);
  });

  it('should handle excessive whitespace', () => {
    const text = '   hello    world   ';
    const stats = calculateStats(text);
    expect(stats.words).toBe(2);
    expect(stats.characters).toBe(20);
  });
});
