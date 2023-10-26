import { BlogPage } from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { themes } from 'styles/themes.css';
import { DefBlogs, DefTheme } from 'types';
import BlogsOverview from './components/BlogsOverview';

type Props = {
  theme?: DefTheme;
  callback?: () => void;
  allBlogs: DefBlogs;
  paramKey?: Lowercase<string>;
};

const Blog = ({ paramKey = 'blog', ...props }: Props): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <div className={themes[props.theme?.theme || 'PLAIN_DARK'].nodes}>
      {hasTitle ? (
        <BlogPage paramKey={paramKey} {...props} />
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </div>
  );
};

export default Blog;
export * from 'types/index';
export * from 'hooks/useBlogs';
export * from 'components';
