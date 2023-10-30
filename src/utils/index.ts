import { MarkdownToJSX } from 'markdown-to-jsx';
import { DefTheme } from 'types';

export const storeTheme = (theme: DefTheme): void =>
  localStorage.setItem('react-blogs-theme', JSON.stringify(theme));

export const getTheme = (): DefTheme => {
  const theme = localStorage.getItem('react-blogs-theme');

  if (theme) {
    return JSON.parse(theme) as DefTheme;
  }

  const defaultTheme: DefTheme = {
    theme: 'PLAIN_DARK',
  };
  return defaultTheme;
};

export const isOverrideWithProps = (
  value: MarkdownToJSX.Override
): value is { component?: React.ElementType; props: object } => {
  return typeof value === 'object' && 'props' in value;
};

export const isLabelInProps = (props: object): object => {
  return 'label' in props ? { ...props, label: undefined } : { ...props };
};

export { default as processBlog } from './processBlog';
export { default as processLinks } from './processLinks';
