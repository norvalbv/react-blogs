import { HeaderProps } from 'components/Header';
import { ReactNode } from 'react';

import { Require } from './utils';

export type Theme = 'DARK_THEME' | 'LIGHT_THEME';

export type Blogs = {
  readonly id: string;
  file: string | URL;
  url: string;
  accessor?: ReactNode;
  showFrontMatter?: boolean;
  metadata?: Record<string, string | number>;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = {
  style: string;
  blogs: Blogs[];
};

export type FrontMatter = Record<
  string,
  number | string | Date | (number | string | Date)[]
> | null;
