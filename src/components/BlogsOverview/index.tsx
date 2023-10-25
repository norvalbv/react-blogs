import { Metadata } from 'components';
import React, { ReactElement } from 'react';
import { DefBlogs, DefTheme } from 'types';

type Props = {
  allBlogs: DefBlogs;
  paramKey: Lowercase<string>;
  theme?: DefTheme;
};

const BlogsOverview = ({ allBlogs, paramKey, theme }: Props): ReactElement => {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {allBlogs.map((blog) => (
        <a href={`?${paramKey}=${blog.url}`} key={blog.id}>
          {/* <Header
            title={{
              label: blog.title.label,
              level: 2,
              // Set to h2 as level is 2
              className: getClassName({ tag: 'h2', theme }),
            }}
            {...(blog.subtitle
              ? { subtitle: { ...blog.subtitle, className: getClassName({ tag: 'h4', theme }) } }
              : {})}
            {...(blog.description
              ? {
                  description: {
                    ...blog.description,
                    className: getClassName({ tag: 'p', theme }),
                  },
                }
              : {})}
          /> */}
          <Metadata data={blog} theme={theme} />
        </a>
      ))}
    </section>
  );
};

export default BlogsOverview;
