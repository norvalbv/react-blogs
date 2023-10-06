import { ThemeProvider } from '@emotion/react';
import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { DefBlogs, Theme } from 'types';
import * as themes from 'types/themes';
import BlogsOverview from './components/BlogsOverview';

type Props = {
  theme?: Theme;
  callback?: () => void;
  allBlogs: DefBlogs;
  paramKey?: Lowercase<string>;
};

const Blog = ({ paramKey = 'blog', theme = 'DARK_THEME', ...props }: Props): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <ThemeProvider theme={themes[theme]}>
      {hasTitle ? (
        <BlogPage allBlogs={props.allBlogs} paramKey={paramKey} callback={props.callback} />
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </ThemeProvider>
  );
};

export default Blog;
export * from 'types/index';
