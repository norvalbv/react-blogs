import { ThemeProvider } from '@emotion/react';
import React, { ReactElement } from 'react';
import * as themes from 'types/themes';
import { Theme } from 'types';

import BlogsOverview, { BlogsPageProps } from './components/BlogsOverview';
import BlogPage from 'components/BlogPage';

type BlogProps = {
  theme?: Theme;
  callback?: () => void;
} & BlogsPageProps;

const Blog = ({ paramKey = 'title', theme = 'DARK_THEME', ...props }: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <ThemeProvider theme={themes[theme]}>
      {hasTitle ? (
        <BlogPage allBlogs={props.allBlogs.blogs} paramKey={paramKey} callback={props.callback} />
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </ThemeProvider>
  );
};

export default Blog;
export * from 'types/index';
