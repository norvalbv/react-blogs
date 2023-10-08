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
  metadata: { color: null },
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
    prismTheme: 'vsDark',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: 'rgb(67 56 202)' },
      h2: { color: 'rgb(79 70 229)' },
      h3: { color: '' },
      h4: { color: '' },
      li: { color: '' },
      metadata: { color: 'green' },
      p: { color: '' },
      strong: { color: '' },
      ul: { color: '' },
      code: { prismTheme: 'vsDark' },
    }),
  },
  LIGHT_THEME: {
    prismTheme: 'vsLight',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: '#6366f1)' },
      h2: { color: '#818cf8' },
      h3: { color: '' },
      h4: { color: '' },
      li: { color: '' },
      metadata: { color: 'blue' },
      p: { color: '' },
      strong: { color: '' },
      ul: { color: '' },
      code: { prismTheme: 'vsLight' },
    }),
  },
};

export const styles = {
  a: style([defaults.a, { color: themeContract.a.color }]),
  blockquote: style([defaults.blockquote, { color: themeContract.blockquote.color }]),
  em: style([defaults.em, { color: themeContract.em.color }]),
  h1: style([defaults.h1, { color: themeContract.h1.color }]),
  h2: style([defaults.h2, { color: themeContract.h2.color }]),
  h3: style([defaults.h3, { color: themeContract.h3.color }]),
  h4: style([defaults.h4, { color: themeContract.h4.color }]),
  li: style([defaults.li, { color: themeContract.li.color }]),
  metadata: style({ color: themeContract.metadata.color }),
  p: style([defaults.p, { color: themeContract.p.color }]),
  strong: style([defaults.strong, { color: themeContract.strong.color }]),
  ul: style([defaults.ul, { color: themeContract.ul.color }]),
  code: defaults.code,
  inlinecode: defaults.inlinecode,
};
