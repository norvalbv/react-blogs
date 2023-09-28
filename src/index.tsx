import React, { ReactElement } from 'react';
// import BlogPage from './components/Blog';
import BlogsOverview from './components/BlogsOverview';
import { DefBlogs, Themes } from './types';

type BlogProps = {
  allBlogs: DefBlogs;
  paramKey?: Lowercase<string>;
  theme?: Themes;
};

const Blog = ({ allBlogs, paramKey = 'title', theme = 'DARK_THEME' }: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return hasTitle ? (
    <div>helllll123112352023llo</div>
  ) : (
    <BlogsOverview allBlogs={allBlogs} paramKey={paramKey} theme={theme} />
  );
};

export default Blog;
export * from './types';

// ! USE JAVASCRIPT TO APPLY THE THEMES
