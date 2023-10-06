import { HeaderProps } from 'components/Header';
import { ReactNode } from 'react';

import { Require } from './utils';

export type Theme = 'DARK_THEME' | 'LIGHT_THEME';

export type Blogs = {
  accessor?: ReactNode;
  file: string | URL;
  metadata?: Record<string, string | number>;
  readonly id: string;
  showFrontMatter?: boolean;
  url: string;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = Blogs[];

export type FrontMatter = Record<
  string,
  number | string | Date | (number | string | Date)[]
> | null;
