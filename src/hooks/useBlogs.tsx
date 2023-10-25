import { DefBlogs, DefTheme } from 'types';

type Props = {
  blogs: DefBlogs;
  theme: DefTheme;
};

type ReturnValue = {
  blogs: unknown;
};

const useBlogs = ({ blogs, theme }: Props): ReturnValue => {
  const processedTheme = theme || { theme: 'PLAIN_DARK' };
  const processedBlogs = blogs.map((blog) => {
    return {
      ...blog,
      title: {
        children: blog.title,
        theme: processedTheme,
      },
      // subtitle: blog.subtitle
      //   ? {
      //       label: blog.subtitle,
      //       theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
      //     }
      //   : undefined,
      // description: blog.description
      //   ? {
      //       label: blog.description,
      //       theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
      //     }
      //   : undefined,
      // metadata: blog.metadata
      //   ? {
      //       data: { ...blog.metadata },
      //       theme: { theme: processedTheme.theme, overrides: processedTheme.overrides },
      //     }
      //   : undefined,
    };
  });

  return {
    blogs: processedBlogs,
  };
};

export default useBlogs;
