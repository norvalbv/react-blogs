import { HeaderProps } from 'components/Header';
import { themes } from 'prism-react-renderer';
import { ElementType, ReactNode } from 'react';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { Require } from './utils';

export type Blogs = {
  accessor?: ReactNode;
  file: string | URL;
  metadata?: Record<string, string>;
  readonly id: string;
  frontMatter?: {
    showFrontMatter?: boolean;
    delimeter?: string;
    position?: 'start' | 'end';
  };
  url: string;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = Blogs[];

export type FrontMatter =
  | Record<string, number | string | boolean | (number | string | boolean)[]>
  | (number | string | boolean)[]
  | null;

// for prec-ommit test
export type DefTheme = {
  theme?: 'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN';
  code?: keyof typeof themes;
  overrides?: MarkdownToJSX.Overrides & { metadata?: { component: ElementType; props: Object } } & {
    frontmatter?: { component: ElementType; props: Object };
  };
};
