import { HeaderProps } from 'components/Header';
import { ReactNode } from 'react';

import { Require } from './utils';

export type Theme = 'DARK_THEME' | 'LIGHT_THEME';

type MetadataKeys = 'date posted' | 'read time' | 'level';

type DatePostedType = Date | number | string;
type ReadTimeType = number | string;
type LevelType = string;

// prettier-ignore
export type Metadata = {
  [K in MetadataKeys]: (
    K extends 'date posted' ? DatePostedType :
    K extends 'read time' ? ReadTimeType :
    K extends 'level' ? LevelType :
    string
  )
};

export type KeyIsMetadata<K extends string> = K extends keyof Metadata ? true : false;

type Blogs = {
  readonly id: Lowercase<string>;
  file: string | URL;
  url: string;
  accessor?: ReactNode;
  containsFrontMatter?: boolean;
  frontMatterPosition?: 'top' | 'bottom';
  metadata?: Partial<Metadata> & Record<string, string | number | Date>;
} & Require<HeaderProps, 'title'>;

export type DefBlogs = {
  style: string;
  blogs: Blogs[];
};

