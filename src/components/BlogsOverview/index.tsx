import Header from 'components/Header';
import React, { ReactElement } from 'react';
import { DefBlogs } from 'types';

type Props = {
  allBlogs: DefBlogs;
  paramKey: Lowercase<string>;
};

const BlogsOverview = ({ allBlogs, paramKey }: Props): ReactElement => {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {allBlogs.map((blog) => (
        <a href={`?${paramKey}=${blog.url}`} key={blog.id}>
          <Header
            // className={{ marginBottom: '8px' }}
            title={{
              text: blog.title.text,
              level: 2,
            }}
            {...(blog.subtitle ? { subtitle: { ...blog.subtitle } } : {})}
            {...(blog.description ? { description: { ...blog.description } } : {})}
          />
          {blog.metadata && (
            <p
              style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                fontStyle: 'italic',
                flexWrap: 'wrap',
                // color: theme.metadata,
              }}
            >
              {Object.entries(blog.metadata).map(([key, value], i, arr) => (
                <>
                  <span key={key}>{`${key}: ${value}`}</span>
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
