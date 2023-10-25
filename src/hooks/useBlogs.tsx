import { DefBlogs, DefTheme } from 'types';

export type ReturnValue = {
  blogs: DefBlogs;
};

type Props = {
  blogs: DefBlogs;
  theme: DefTheme;
};

export const useBlogs = ({ blogs, theme }: Props): ReturnValue => {
  const processedTheme = theme || { theme: 'PLAIN_DARK' };
  const processedBlogs = blogs.map((blog) => {
    return {
      ...blog,
      title: {
        ...blog.title,
        theme: processedTheme,
      },
    };
  });

  return {
    blogs: processedBlogs,
  };
};
