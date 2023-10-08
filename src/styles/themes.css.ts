import { createTheme, createThemeContract, style } from '@vanilla-extract/css';
import { themes as prismThemes } from 'prism-react-renderer';
import { defaults } from './defaults.css';

const themeContract = createThemeContract({
  a: { color: null },
  blockquote: { color: null },
  em: { color: null },
  h1: { color: null },
  h2: { color: null },
  h3: { color: null },
  h4: { color: null },
  li: { color: null },

  p: { color: null },
  strong: { color: null },
  ul: { color: null },
  code: { prismTheme: null },
});

type Themes = {
  [themeKey: string]: {
    prismTheme: keyof typeof prismThemes;
    nodes: string;
  };
};
export const themes: Themes = {
  DARK_THEME: {
    prismTheme: 'dracula',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: 'rgb(67 56 202)' },
      h2: { color: 'rgb(79 70 229)' },
      h3: { color: '' },
      h4: { color: '' },
      li: { color: '' },
      p: { color: '' },
      strong: { color: '' },
      ul: { color: '' },
      code: { prismTheme: 'vsDark' },
    }),
  },
  LIGHT_THEME: {
    prismTheme: 'oneLight',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: '#6366f1)' },
      h2: { color: '#818cf8' },
      h3: { color: '' },
      h4: { color: '' },
      li: { color: '' },
      p: { color: '' },
      strong: { color: '' },
      ul: { color: '' },
      code: { prismTheme: 'vsLight' },
    }),
  },
};

export const styles = {
  a: style([defaults.a, { ...themeContract.a }]),
  blockquote: style([defaults.blockquote, { ...themeContract.blockquote }]),
  code: defaults.code,
  em: style([defaults.em, { ...themeContract.em }]),
  h1: style([defaults.h1, { ...themeContract.h1 }]),
  h2: style([defaults.h2, { ...themeContract.h2 }]),
  h3: style([defaults.h3, { ...themeContract.h3 }]),
  h4: style([defaults.h4, { ...themeContract.h4 }]),
  inlinecode: defaults.inlinecode,
  li: style([{ ...themeContract.li }]),
  metadata: defaults.metadata,
  p: style([defaults.p, { ...themeContract.p }]),
  strong: style([defaults.strong, { ...themeContract.strong }]),
  ul: style([defaults.ul, { ...themeContract.ul }]),
};
