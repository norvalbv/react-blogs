import { style } from '@vanilla-extract/css';

const h1 = style({
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
});

const h2 = style({
  fontSize: '1.75rem',
  lineHeight: '2rem',
  textTransform: 'capitalize',
  textDecoration: 'underline',
  margin: '1.5rem 0 .5rem',
});

const h3 = style({
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  margin: '1rem 0 .5rem',
  '@media': {
    'screen and (min-width: 768px)': { fontSize: '1.5rem', lineHeight: '1.75rem' },
  },
});

const h4 = style({
  margin: '.25rem 0',
  '@media': {
    'screen and (min-width: 768px)': { fontSize: '1.125rem', lineHeight: '1.75rem' },
  },
});

const p = style({
  margin: '.5rem 0',
});

const ul = style({
  margin: '.5rem 0',
});

const a = style({
  textDecoration: 'underline',
});

const strong = style({
  fontWeight: 600,
});

const em = style({
  fontStyle: 'italic',
});

const blockquote = style({
  marginLeft: '1rem',
  borderLeft: '1px solid',
  paddingLeft: '1rem',
  fontStyle: 'italic',
});

const code = style({
  borderRadius: '8px',
  margin: '8px 0',
  fontSize: '.85rem',
  overflowX: 'scroll',
  padding: '.75rem 1rem',
  position: 'relative',
});

const clipboard = style({
  position: 'absolute',
  top: '.5rem',
  right: '.5rem',
  zIndex: 5,
  width: '1.5rem',
  height: '1.5rem',
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 0.25s ease',
  selectors: {
    [`${code}:hover &`]: {
      opacity: 1,
    },
  },
});

const inlinecode = style({
  borderRadius: '8px',
  fontSize: '.85rem',
  padding: '.4rem .7rem',
});

const metadata = style({
  display: 'flex',
  gap: '0.5rem',
  fontSize: '0.75rem',
  textTransform: 'capitalize',
  fontStyle: 'italic',
  flexWrap: 'wrap',
});

const badge = style({
  borderRadius: '0.5rem',
  padding: '0 0.5rem',
  width: 'max-content',
  display: 'inline-block',
  margin: '0 0.25rem',
});

export const defaults = {
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  a,
  strong,
  em,
  blockquote,
  code,
  clipboard,
  inlinecode,
  metadata,
  badge,
};
