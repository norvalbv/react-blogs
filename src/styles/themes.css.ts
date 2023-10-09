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
  h5: { color: null },
  h6: { color: null },
  li: { color: null },
  p: { color: null },
  strong: { color: null },
  ul: { color: null },
});

type Themes = {
  [themeKey: string]: {
    prismTheme: keyof typeof prismThemes;
    nodes: string;
  };
};
export const themes: Themes = {
  PLAIN_DARK: {
    prismTheme: 'dracula',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: '#3c42c4' },
      h2: { color: '#6366f1' },
      h3: { color: '#a3a5f7' },
      h4: { color: '#c1a5f5' },
      h5: { color: '#e4a6ed' },
      h6: { color: '#90c7de' },
      li: { color: '' },
      p: { color: '' },
      strong: { color: '' },
      ul: { color: '' },
    }),
  },
  SHADES_OF_PURPLE: {
    prismTheme: 'shadesOfPurple',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '#afacf7' },
      h1: { color: '#3c42c4' },
      h2: { color: '#6366f1' },
      h3: { color: '#a3a5f7' },
      h4: { color: '#c1a5f5' },
      h5: { color: '#e4a6ed' },
      h6: { color: '#90c7de' },
      li: { color: '' },
      p: { color: '#bfe8ff' },
      strong: { color: '#ad86f1' },
      ul: { color: '' },
    }),
  },
  SHADES_OF_GREEN: {
    prismTheme: 'github',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '#547f7c' },
      h1: { color: '#0A5C36' },
      h2: { color: '#216229' },
      h3: { color: '#236f4c' },
      h4: { color: '#167e8c' },
      h5: { color: '#9ca585' },
      h6: { color: '#869f88' },
      li: { color: '' },
      p: { color: '#849bb3' },
      strong: { color: '#547f7c' },
      ul: { color: '' },
    }),
  },
  PLAIN_LIGHT: {
    prismTheme: 'oneLight',
    nodes: createTheme(themeContract, {
      a: { color: '' },
      blockquote: { color: '' },
      em: { color: '' },
      h1: { color: '#222222' },
      h2: { color: '#3f3e3e' },
      h3: { color: '#36363a' },
      h4: { color: '#7f7b7f' },
      h5: { color: '#858389' },
      h6: { color: '#7a7d84' },
      li: { color: '' },
      p: { color: '#686e70' },
      strong: { color: '' },
      ul: { color: '' },
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
  h5: style([defaults.h4, { ...themeContract.h4 }]),
  h6: style([defaults.h4, { ...themeContract.h4 }]),
  inlinecode: defaults.inlinecode,
  li: style([{ ...themeContract.li }]),
  metadata: defaults.metadata,
  p: style([defaults.p, { ...themeContract.p }]),
  strong: style([defaults.strong, { ...themeContract.strong }]),
  ul: style([defaults.ul, { ...themeContract.ul }]),
};
