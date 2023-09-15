import React, { ReactElement } from 'react';

export type DescriptionProps = {
  children?: string | JSX.Element;
  className?: string;
  testId?: string;
};

const Description = ({ children, className, testId }: DescriptionProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <p className={className} data-testid={testId || `${children} Description`}>
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
