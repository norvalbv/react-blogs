import { MarkdownToJSX } from 'markdown-to-jsx';
import { themes } from 'prism-react-renderer';
import { ElementType, ReactNode } from 'react';

export type BlogType = {
  accessor?: ReactNode;
  description?: string;
  file: string | URL;
  frontMatter?: {
    delimiter?: string;
    position?: 'start' | 'end';
    showFrontMatter?: boolean;
  };
  id: string;
  imagePath?: string;
  metadata?: Record<string, string>;
  subtitle?: string;
  title: string;
  url: string;
};

export type DefBlogs = BlogType[];

export type FrontMatter = Record<string, unknown> | unknown[] | null;

export type DefTheme = {
  code?: keyof typeof themes;
  overrides?: MarkdownToJSX.Overrides & {
    frontmatter?: { component: ElementType; props: object };
  };
  theme?: 'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN';
};
