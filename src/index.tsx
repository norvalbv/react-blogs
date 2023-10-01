import { ThemeProvider } from '@emotion/react';
import React, { ReactElement } from 'react';
import * as themes from 'types/themes'
import { Theme } from 'types';

import BlogsOverview, { BlogsPageProps } from './components/BlogsOverview';

type BlogProps = {
  theme?: Theme;
} & BlogsPageProps;

const Blog = ({ paramKey = 'title', theme = 'DARK_THEME', ...props }: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return (
    <ThemeProvider theme={themes[theme]}>
      {hasTitle ? (
        <div>helllll123112352023llo</div>
      ) : (
        <BlogsOverview paramKey={paramKey} {...props} />
      )}
    </ThemeProvider>
  );
};

export default Blog;
export * from 'types/index';
