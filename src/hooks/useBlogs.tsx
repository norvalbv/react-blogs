import { DefBlogs, DefTheme } from 'types';
import useStore from 'hooks/useStore';

type Props = {
  blogs: DefBlogs;
  theme: DefTheme;
};

type ReturnValue = {
  blogs: unknown;
};

export const useBlogs = ({ blogs, theme }: Props): ReturnValue => {
  const processedTheme = theme || { theme: 'PLAIN_DARK' };

  const setTheme = useStore((state) => state.setTheme);
  setTheme(theme);

  const processedBlogs = blogs.map((blog) => {
    return {
      ...blog,
      title: {
        children: blog.title,
        theme: processedTheme,
      },
      subtitle: blog.subtitle
        ? {
            label: blog.subtitle,
            theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
          }
        : undefined,
      description: blog.description
        ? {
            label: blog.description,
            theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
          }
        : undefined,
      metadata: blog.metadata
        ? {
            data: { ...blog.metadata },
            theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
          }
        : undefined,
    };
  });

  return {
    blogs: processedBlogs,
  };
};

export default useBlogs;
