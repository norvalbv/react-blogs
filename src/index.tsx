import { ThemeProvider } from '@emotion/react';
import BlogPage from 'components/BlogPage';
import React, { ReactElement } from 'react';
import { DefBlogs, DefTheme } from 'types';
import * as themes from 'types/themes';
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
    <ThemeProvider theme={themes[props.theme?.theme || 'DARK_THEME']}>
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
    </ThemeProvider>
  );
};

export default Blog;
export * from 'types/index';

// export the emotion.d.ts themes so use can define their own theme.
