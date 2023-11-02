import { themes } from 'prism-react-renderer';
import { ElementType, ReactNode } from 'react';
import { MarkdownToJSX } from 'markdown-to-jsx';

export type BlogType = {
  accessor?: ReactNode;
  description?: string;
  file: string | URL;
  frontMatter?: {
    showFrontMatter?: boolean;
    delimiter?: string;
    position?: 'start' | 'end';
  };
  imagePath?: string;
  metadata?: Record<string, string>;
  id: string;
  subtitle?: string;
  title: string;
  url: string;
};

export type DefBlogs = BlogType[];

export type FrontMatter = Record<string, unknown> | unknown[] | null;

export type DefTheme = {
  theme?: 'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN';
  code?: keyof typeof themes;
  overrides?: MarkdownToJSX.Overrides & { metadata?: { component: ElementType; props: object } } & {
    frontmatter?: { component: ElementType; props: object };
  };
};
