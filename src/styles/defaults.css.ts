import { style } from '@vanilla-extract/css';

export const defaults = {
  h1: style({
    fontSize: '1.75rem',
    lineHeight: '2rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    marginBottom: '0.5rem',
    '@media': {
      'screen and (min-width: 768px)': {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
    },
  }),
  h2: style({
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    margin: '1rem 0',
  }),
  h3: style({
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    margin: '1rem 0',
    '@media': {
      'screen and (min-width: 768px)': { fontSize: '1.5rem', lineHeight: '1.75rem' },
    },
  }),
  h4: style({
    margin: '1rem 0',
    '@media': {
      'screen and (min-width: 768px)': { fontSize: '1.125rem', lineHeight: '1.75rem' },
    },
  }),
  p: style({
    margin: '0.75rem 0',
    lineHeight: '1.5rem',
  }),
  ul: style({
    margin: '.5rem 0',
  }),
  li: style({
    margin: '.25rem 0',
  }),
  a: style({
    textDecoration: 'underline',
  }),
  strong: style({
    fontWeight: 600,
  }),
  em: style({
    fontStyle: 'italic',
  }),
  blockquote: style({
    marginLeft: '1rem',
    borderLeft: '1px solid',
    paddingLeft: '1rem',
    fontStyle: 'italic',
  }),
  code: style({
    borderRadius: '8px',
    margin: '8px 0',
    fontSize: '.85rem',
    overflowX: 'scroll',
    padding: '.75rem 1rem',
  }),
  inlinecode: style({
    borderRadius: '8px',
    fontSize: '.85rem',
    padding: '.4rem .7rem',
  }),
};
