import { MarkdownToJSX } from 'markdown-to-jsx';
import { themes } from 'prism-react-renderer';
import { ElementType, ReactNode } from 'react';
import { RequireAtLeastOne } from './utils';

type Overrides = {
  [tag in keyof JSX.IntrinsicElements]?: MarkdownToJSX.Override;
};

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

export type JSXOverrides = Omit<Overrides, 'code'> & {
  code?: RequireAtLeastOne<{
    component: ElementType;
    props: object;
    showNumbers: boolean;
    theme: keyof typeof themes;
  }>;
  clipboard?: RequireAtLeastOne<{
    callback: (args?: unknown) => void;
    component: ElementType;
    props: object;
    show: boolean;
  }>;
  frontmatter?: RequireAtLeastOne<{ component: ElementType; props: object }>;
};

export type DefTheme = {
  overrides?: JSXOverrides;
  theme?: 'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN';
};
