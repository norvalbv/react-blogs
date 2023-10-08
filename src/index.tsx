import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { DefBlogs, DefTheme } from 'types';
import BlogsOverview from './components/BlogsOverview';
import { themes as c } from 'styles/themes.css';

type Props = {
  theme?: DefTheme;
  callback?: () => void;
  allBlogs: DefBlogs;
  paramKey?: Lowercase<string>;
};

const Blog = ({ paramKey = 'blog', ...props }: Props): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <div className={c[props.theme?.theme || 'DARK_THEME']}>
      {hasTitle ? (
        <BlogPage
          allBlogs={props.allBlogs}
          paramKey={paramKey}
          callback={props.callback}
          theme={props.theme}
        />
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </div>
  );
};

export default Blog;
export * from 'types/index';
