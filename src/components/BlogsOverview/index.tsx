import { useTheme } from '@emotion/react';
import Header, { HeaderProps } from 'components/Header';
import React, { ReactElement } from 'react';
import { DefBlogs } from 'types';
import { convertToDate } from 'utils/date';

export type BlogsPageProps = {
  allBlogs: DefBlogs;
  paramKey: Lowercase<string>;
};

const BlogsOverview = ({ allBlogs, paramKey }: BlogsPageProps): ReactElement => {
  const theme = useTheme();
  const sortedBlogs = [...allBlogs.blogs].sort((a, b) => {
    const dateA = new Date(a.metadata?.['date posted'] ?? 0);
    const dateB = new Date(b.metadata?.['date posted'] ?? 0);
    return dateB.getTime() - dateA.getTime();
  });

  const extractMetadata = (key: string, value: number | Date | string): string | number => {
    if (key === 'date processed' && typeof value === 'number') {
      return convertToDate({
        timestamp: value,
        format: {
          type: 'custom',
          customValues: { day: 'numeric', month: 'long', year: 'numeric' },
        },
      });
    }
    if (value instanceof Date) {
      return convertToDate({
        timestamp: value.getTime(),
        format: {
          type: 'custom',
          customValues: { day: 'numeric', month: 'long', year: 'numeric' },
        },
      });
    }

    if (key === 'read time' && typeof value === 'number') {
      return `${value} minutes`;
    }
    return value;
  };

  return (
    <section css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {sortedBlogs.map((blog) => (
        <a href={`?${paramKey}=${blog.url}`} key={blog.id}>
          <Header
            css={{ marginBottom: '8px' }}
            title={{
              text: blog.title.text,
              level: 2,
            }}
            {...(blog.subtitle ? {subtitle: { ...blog.subtitle } }: {} )}
            {...(blog.description ? {description: { ...blog.description } }: {} )}
          />
          {blog.metadata && (
            <p
              css={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                fontStyle: 'italic',
                flexWrap: 'wrap',
                color: theme.metadata,
              }}
            >
              {Object.entries(blog.metadata).map(([key, value], i, arr) => (
                <>
                  <span key={key}>{`${key}: ${extractMetadata(key, value)}`}</span>
                  {i < arr.length - 1 && <span>•</span>}
                </>
              ))}
            </p>
          )}
        </a>
      ))}
    </section>
  );
};

export default BlogsOverview;
