import React, { ReactElement } from 'react';
import { styles } from 'styles/themes.css';

export type DescriptionProps = {
  children?: string | ReactElement;
  className?: string;
  testId?: string;
};

const Description = ({ children, className, testId }: DescriptionProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <p className={className || styles.p} data-testid={testId || `${children} Description`}>
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
