import { ReactNode } from 'react';

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

export type DefBlogs = {
  readonly id: Lowercase<string>;
  file: string | URL;
  title: string;
  subtitle?: string | JSX.Element;
  description?: string | JSX.Element;
  url: string;
  accessor?: ReactNode;
  containsFrontMatter?: boolean;
  frontMatterPosition?: 'top' | 'bottom';
  metadata?: Partial<Metadata> & Record<string, string | number | Date>;
};
