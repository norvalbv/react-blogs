import { ThemeProvider } from '@emotion/react';
import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { DefBlogs, Theme } from 'types';
import * as themes from 'types/themes';
import BlogsOverview from './components/BlogsOverview';
import { themes as prismThemes } from 'prism-react-renderer';

type Props = {
  theme?: Theme;
  callback?: () => void;
  style?: keyof typeof prismThemes;
  allBlogs: DefBlogs;
  paramKey: Lowercase<string>;
};

const Blog = ({
  paramKey = 'blog',
  theme = 'DARK_THEME',
  style,
  ...props
}: Props): ReactElement => {
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
