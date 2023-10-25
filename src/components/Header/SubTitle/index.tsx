import React, { ReactElement } from 'react';
import { styles, themes } from 'styles/themes.css';
import { getClassName } from 'utils';

export type SubtitleProps = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
};

const Subtitle = ({ children, className, ...props }: SubtitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4
        className={
          className || getClassName('h4') || `${themes.SHADES_OF_GREEN.nodes} ${styles.h1}`
        }
        {...props}
      >
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
