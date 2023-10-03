import { ThemeProvider } from '@emotion/react';
import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { Theme } from 'types';
import * as themes from 'types/themes';
import BlogsOverview, { BlogsPageProps } from './components/BlogsOverview';

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
