import React, { ReactElement } from 'react';
import { styles, themes } from 'styles/themes.css';
import { DefTheme } from 'types';
import { getClassName } from 'utils';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
  theme: DefTheme;
  props?: unknown;
};

export const Title = ({
  children,
  className,
  level = 2,
  theme,
  ...props
}: TitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (level === 1) {
    return (
      <h1
        className={
          className ||
          getClassName('h1', theme) ||
          `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles.h1}`
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
          className ||
          getClassName('h2') ||
          `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles.h2}`
        }
        {...props}
      >
        {children}
      </h2>
    );
  }

  return (
    <h3
      className={
        className ||
        getClassName('h3') ||
        `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles.h3}`
      }
      {...props}
    >
      {children}
    </h3>
  );
};
