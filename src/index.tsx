import { ThemeProvider } from '@emotion/react';
import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { Theme } from 'types';
import * as themes from 'types/themes';
import BlogsOverview, { BlogsPageProps } from './components/BlogsOverview';
import { themes as prismThemes } from 'prism-react-renderer';

type BlogProps = {
  theme?: Theme;
  callback?: () => void;
  style?: keyof typeof prismThemes;
} & BlogsPageProps;

const Blog = ({
  paramKey = 'blog',
  theme = 'DARK_THEME',
  style,
  ...props
}: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <ThemeProvider theme={themes[theme]}>
      {hasTitle ? (
        <BlogPage
          allBlogs={props.allBlogs}
          paramKey={paramKey}
          theme={style}
          callback={props.callback}
        />
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </ThemeProvider>
  );
};

export default Blog;
export * from 'types/index';
