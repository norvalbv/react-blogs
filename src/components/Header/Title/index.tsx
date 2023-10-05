import React, { ReactElement } from 'react';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
};

const Title = ({ children, className, level = 2 }: TitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (level === 1) {
    return (
      <h1
        css={{
          marginBottom: '4.5rem',
          width: 'max-content',
          bordeBottom: '1px solid',
          paddingBottom: '0.5rem',
          fontSize: '3rem',
          fontWeight: 600,
        }}
        className={className}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        css={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          marginBottom: '1rem',
          fontSize: '2rem',
          fontWeight: 600,
        }}
        className={className}
      >
        {children}
      </h2>
    );
  }

  return (
    <h3
      css={{
        marginBottom: '2.5rem',
        fontSize: '1.75rem',
        fontWeight: 600,
      }}
      className={className}
    >
      {children}
    </h3>
  );
};

export default Title;
