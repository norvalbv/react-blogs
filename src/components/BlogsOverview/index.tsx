import Header from 'components/Header';
import React, { Fragment, ReactElement } from 'react';
import { styles } from 'styles/themes.css';
import { DefBlogs, DefTheme } from 'types';
import { getClassName } from 'utils';

type Props = {
  allBlogs: DefBlogs;
  paramKey: Lowercase<string>;
  theme?: DefTheme;
};

const BlogsOverview = ({ allBlogs, paramKey, theme }: Props): ReactElement => {
  const MetadataComponent = theme?.overrides?.metadata?.component;
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {allBlogs.map((blog) => (
        <a href={`?${paramKey}=${blog.url}`} key={blog.id}>
          <Header
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
          />
          {blog.metadata && MetadataComponent ? (
            <MetadataComponent
              metadata={blog.metadata}
              className={getClassName({ tag: 'metadata', theme }) || styles.metadata}
              {...theme?.overrides?.metadata?.props}
            />
          ) : (
            blog.metadata && (
              <p className={getClassName({ tag: 'metadata', theme }) || styles.metadata}>
                {Object.entries(blog.metadata).map(([key, value], i, arr) => (
                  <Fragment key={key}>
                    <span>{`${key}: ${value}`}</span>
                    {i < arr.length - 1 && <span>•</span>}
                  </Fragment>
                ))}
              </p>
            )
          )}
        </a>
      ))}
    </section>
  );
};

export default BlogsOverview;
