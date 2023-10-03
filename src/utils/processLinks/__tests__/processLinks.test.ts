import processLink from '..';

import { Blogs } from 'types';

const blogs: Blogs[] = [
  {
    id: 'memory',
    file: 'memory',
    title: { text: 'What is RAM?' },
    url: 'how-memory-works',
  },
  {
    id: 'CPU',
    file: 'cpu',
    title: { text: 'What is the CPU?' },
    url: 'what-is-the-cpu',
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
 * [[CPU]] -> [CPU](?paramKey=CPU)
 * [[CPU#CPU1]] -> [CPU](?paramKey=CPU#CPU1)
 * [[CPU|CPU2]] -> [CPU2](?paramKey=CPU)
 * [[CPU#CPU1|CPU2]] -> [CPU2](?paramKey=CPU#CPU1)
 * [[memory]] -> memory
 * [[memory#memory1]] -> memory
 * [[memory|memory2]] -> memory2
 * [[memory#memory1|memory2]] -> memory
 */

describe('processLink', () => {
  test('should handle simple blog link', () => {
    expect(processLink({ allBlogs: blogs, blog: '[[Memory (RAM)]]', paramKey: 'blog' })).toBe(
      '[Memory (RAM)](/blog/how-memory-works)'
    );
  });

  test('should handle blog link with anchor', () => {
    expect(
      processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[Memory (RAM)#memory]]' })
    ).toBe('[Memory (RAM)](/blog/how-memory-works#memory)');
  });

  test('should handle blog link with name override', () => {
    expect(processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[Memory (RAM)|CPU2]]' })).toBe(
      '[CPU2](/blog/how-memory-works)'
    );
  });

  test('should handle blog link with both anchor and name override', () => {
    expect(
      processLink({
        paramKey: 'blog',
        allBlogs: blogs,
        blog: '[[Memory (RAM)#Hierarchical Nature of Storage|CPU cache (L1, L2, L3 cache)]]',
      })
    ).toBe('[CPU cache (L1, L2, L3 cache)](/blog/how-memory-works#Hierarchical Nature of Storage)');
  });

  test('should handle non-blog link', () => {
    expect(processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[CPU]]' })).toBe('CPU');
  });

  test('should handle non-blog link with anchor', () => {
    expect(processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[CPU#CPU1]]' })).toBe('CPU');
  });

  test('should handle non-blog link with name override', () => {
    expect(processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[CPU|CPU2]]' })).toBe('CPU2');
  });

  test('should handle non-blog link with both anchor and name override', () => {
    expect(processLink({ paramKey: 'blog', allBlogs: blogs, blog: '[[CPU#CPU1|CPU2]]' })).toBe(
      'CPU2'
    );
  });
});
