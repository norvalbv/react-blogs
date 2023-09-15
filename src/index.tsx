import React, { ReactElement } from 'react';
import BlogPage from './components/Blog';
import BlogsOverview from './components/BlogsOverview';
import { DefBlogs } from './types';

type BlogProps = {
  allBlogs: DefBlogs[];
  paramKey?: Lowercase<string>;
  headers?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Blog = ({ allBlogs, paramKey = 'title', headers }: BlogProps): ReactElement => {
  const hasTitle = new URLSearchParams(window.location.search).get(paramKey);

  // Have Set styles
  // Ability to override styles

  // For simple set up, simply just use the component and pass in allBlogs

  // For more dynamic control, use hook.

  return hasTitle ? (
    <BlogPage allBlogs={allBlogs} paramKey={paramKey} />
  ) : (
    <BlogsOverview allBlogs={allBlogs} paramKey={paramKey} />
  );
};

export default Blog;
