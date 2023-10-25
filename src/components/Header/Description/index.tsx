import React, { ReactElement } from 'react';
import { styles, themes } from 'styles/themes.css';
import { getClassName } from 'utils';

export type DescriptionProps = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
};

const Description = ({ children, className, ...props }: DescriptionProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <p
        className={className || getClassName('p') || `${themes.SHADES_OF_GREEN.nodes} ${styles.h1}`}
        {...props}
      >
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
