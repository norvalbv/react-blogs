import { HeaderProps } from 'components/Header';
import { ElementType, ReactNode } from 'react';
import { themes } from 'prism-react-renderer';

import { Require } from './utils';
import { MarkdownToJSX } from 'markdown-to-jsx';

export type Blogs = {
  accessor?: ReactNode;
  file: string | URL;
  metadata?: Record<string, string>;
  readonly id: string;
  frontMatter?: {
    showFrontMatter?: boolean;
    delimeter?: string;
  };
  url: string;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = Blogs[];

export type FrontMatter =
  | Record<string, number | string | boolean | (number | string | boolean)[]>
  | (number | string | boolean)[]
  | null;

export type DefTheme = {
  theme?: 'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN';
  code?: keyof typeof themes;
  overrides?: MarkdownToJSX.Overrides & { metadata?: { component: ElementType; props: Object } };
};
