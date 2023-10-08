import { createTheme, createThemeContract, style } from '@vanilla-extract/css';
import { defaults } from './defaults.css';

const r = createThemeContract({
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
});

export const themes = {
  DARK_THEME: createTheme(r, {
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
  }),

  LIGHT_THEME: createTheme(r, {
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
  }),
};

export const styles = {
  a: style([defaults.a, { color: r.a.color }]),
  blockquote: style([defaults.blockquote, { color: r.blockquote.color }]),
  em: style([defaults.em, { color: r.em.color }]),
  h1: style([defaults.h1, { color: r.h1.color }]),
  h2: style([defaults.h2, { color: r.h2.color }]),
  h3: style([defaults.h3, { color: r.h3.color }]),
  h4: style([defaults.h4, { color: r.h4.color }]),
  li: style([defaults.li, { color: r.li.color }]),
  p: style([defaults.p, { color: r.p.color }]),
  strong: style([defaults.strong, { color: r.strong.color }]),
  ul: style([defaults.ul, { color: r.ul.color }]),
  code: defaults.code,
  inlinecode: defaults.inlinecode,
};
