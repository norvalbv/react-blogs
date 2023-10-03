import processLink from '..';

import { Blogs } from 'types';

const blogs: Blogs[] = [
  {
    id: 'memory-ram',
    file: 'memory',
    title: { text: 'How Memory (RAM) Works' },
    subtitle: { text: 'A deep insight to what RAM is and how it interacts with the computer.' },
    url: 'how-memory-works',
  },
  {
    id: 'memory-heap',
    file: 'memory-heap',
    title: { text: 'What is the Memory Heap?' },
    subtitle: { text: 'A deep insight to what RAM is and how it interacts with the computer.' },
    url: 'memory-heap',
  },
];

/**
 * TEST EXAMPLES
 * -------------
 *
 * Blogs: ['CPU', 'RAM']
 *
 * Inputs / Outputs:
 *
 * [[CPU]] -> [CPU](/blogs/CPU)
 * [[CPU#CPU1]] -> [CPU](/blogs/CPU#CPU1)
 * [[CPU|CPU2]] -> [CPU2](/blogs/CPU)
 * [[CPU#CPU1|CPU2]] -> [CPU2](/blogs/CPU#CPU1)
 * [[memory]] -> memory
 * [[memory#memory1]] -> memory
 * [[memory|memory2]] -> memory2
 * [[memory#memory1|memory2]] -> memory
 */

describe('processLink', () => {
  test('should handle simple blog link', () => {
    expect(processLink('[[Memory (RAM)]]')).toBe('[Memory (RAM)](/blog/how-memory-works)');
  });

  test('should handle blog link with anchor', () => {
    expect(processLink('[[Memory (RAM)#memory]]')).toBe(
      '[Memory (RAM)](/blog/how-memory-works#memory)'
    );
  });

  test('should handle blog link with name override', () => {
    expect(processLink('[[Memory (RAM)|CPU2]]')).toBe('[CPU2](/blog/how-memory-works)');
  });

  test('should handle blog link with both anchor and name override', () => {
    expect(
      processLink('[[Memory (RAM)#Hierarchical Nature of Storage|CPU cache (L1, L2, L3 cache)]]')
    ).toBe('[CPU cache (L1, L2, L3 cache)](/blog/how-memory-works#Hierarchical Nature of Storage)');
  });

  test('should handle non-blog link', () => {
    expect(processLink('[[CPU]]')).toBe('CPU');
  });

  test('should handle non-blog link with anchor', () => {
    expect(processLink('[[CPU#CPU1]]')).toBe('CPU');
  });

  test('should handle non-blog link with name override', () => {
    expect(processLink('[[CPU|CPU2]]')).toBe('CPU2');
  });

  test('should handle non-blog link with both anchor and name override', () => {
    expect(processLink('[[CPU#CPU1|CPU2]]')).toBe('CPU2');
  });
});
