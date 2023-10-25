import React, { ReactElement } from 'react';
import { styles, themes } from 'styles/themes.css';
import { getClassName } from 'utils';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
  props?: unknown;
};

export const Title = ({
  children,
  className,
  level = 2,
  ...props
}: TitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (level === 1) {
    return (
      <h1
        className={
          className || getClassName('h1') || `${themes.SHADES_OF_GREEN.nodes} ${styles.h1}`
        }
        {...props}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        className={
          className || getClassName('h2') || `${themes.SHADES_OF_GREEN.nodes} ${styles.h2}`
        }
        {...props}
      >
        {children}
      </h2>
    );
  }

  return (
    <h3
      className={className || getClassName('h3') || `${themes.SHADES_OF_GREEN.nodes} ${styles.h3}`}
      {...props}
    >
      {children}
    </h3>
  );
};
