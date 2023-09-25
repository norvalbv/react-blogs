import React, { ReactElement } from 'react';
// import BlogPage from './components/Blog';
import BlogsOverview from './components/BlogsOverview';
import { DefBlogs } from './types';

type BlogProps = {
  allBlogs: DefBlogs[];
  paramKey?: Lowercase<string>;
  headers?: unknown;
};

const Blog = ({ allBlogs, paramKey = 'title', headers }: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  return hasTitle ? (
    <div>helllll123112352023llo</div>
  ) : (
    <BlogsOverview allBlogs={allBlogs} paramKey={paramKey} />
  );
};

export default Blog;
export * from './types';
