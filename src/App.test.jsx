import { describe, expect, it } from 'vitest';
import { categories, mergeGames } from './data/games';

describe('PlayVerse data helpers', () => {
  it('deduplicates game records by id', () => {
    const result = mergeGames([{ id: '1', title: 'A' }], [{ id: '1', title: 'A updated' }, { id: '2', title: 'B' }]);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('A');
  });
  it('has an all category', () => expect(categories[0]).toBe('All'));
});
