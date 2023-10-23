import { style } from '@vanilla-extract/css';

export const defaults = {
  h1: style({
    fontSize: '1.75rem',
    lineHeight: '2rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    marginBottom: '2rem',
    '@media': {
      'screen and (min-width: 768px)': {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
    },
  }),
  h2: style({
    fontSize: '1.75rem',
    lineHeight: '2rem',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    margin: '1.5rem 0 .5rem',
  }),
  h3: style({
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    margin: '1rem 0 .5rem',
    '@media': {
      'screen and (min-width: 768px)': { fontSize: '1.5rem', lineHeight: '1.75rem' },
    },
  }),
  h4: style({
    margin: '.25rem 0',
    '@media': {
      'screen and (min-width: 768px)': { fontSize: '1.125rem', lineHeight: '1.75rem' },
    },
  }),
  p: style({
    margin: '.5rem 0',
  }),
  ul: style({
    margin: '.5rem 0',
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
  metadata: style({
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
    fontStyle: 'italic',
    flexWrap: 'wrap',
  }),
  badge: style({
    borderRadius: '0.5rem',
    padding: '0 0.5rem',
    width: 'max-content',
    display: 'inline-block',
    margin: '0 0.25rem',
  }),
};
