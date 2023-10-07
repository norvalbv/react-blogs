import { HeaderProps } from 'components/Header';
import { ReactNode } from 'react';
import { themes } from 'prism-react-renderer';

import { Require } from './utils';
import { MarkdownToJSX } from 'markdown-to-jsx';

export type Blogs = {
  accessor?: ReactNode;
  file: string | URL;
  metadata?: Record<string, string>;
  readonly id: string;
  showFrontMatter?: boolean;
  url: string;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = Blogs[];

export type FrontMatter = Record<
  string,
  number | string | Date | (number | string | Date)[]
> | null;

export type DefTheme = {
  theme?: 'DARK_THEME' | 'LIGHT_THEME';
  metadata?: string; // color
  code?: keyof typeof themes;
  overrides?: MarkdownToJSX.Overrides;
};
