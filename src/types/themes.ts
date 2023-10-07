import { Theme, css } from '@emotion/react';

export const defaults = {
  h1: css({
    fontSize: '1.75rem',
    lineHeight: '2rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    marginBottom: '0.5rem',
    '@media (min-width: 768px)': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
    },
  }),
  h2: css({
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    margin: '1rem 0',
  }),
  h3: css({
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    margin: '1rem 0',
    '@media (min-width: 768px)': {
      fontSize: '1.5rem',
      lineHeight: '1.75rem',
    },
  }),
  h4: css({
    margin: '1rem 0',
    '@media (min-width: 768px)': {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
  }),
  p: css({
    margin: '0.75rem 0',
    lineHeight: '1.5rem',
  }),
  ul: css({
    margin: '.5rem 0',
  }),
  li: css({
    margin: '.25rem 0',
  }),
  a: css({
    textDecoration: 'underline',
  }),
  strong: css({
    fontWeight: 600,
  }),
  em: css({
    fontStyle: 'italic',
  }),
  blockquote: css({
    marginLeft: '1rem',
    borderLeft: '1px solid',
    paddingLeft: '1rem',
    fontStyle: 'italic',
  }),
};

export const DARK_THEME: Theme = {
  metadata: 'gray',
  h1: 'red',
  code: 'dracula',
};

export const LIGHT_THEME: Theme = {
  metadata: 'green',
  h1: 'blue',
  code: 'vsLight',
};
