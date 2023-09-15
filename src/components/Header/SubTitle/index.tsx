import React, { ReactElement } from 'react';

export type SubtitleProps = {
  children?: string | JSX.Element;
  className?: string;
  testId?: string;
};

const Subtitle = ({ children, className, testId }: SubtitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4 className={className} data-testid={testId || `${children} Subtitle`}>
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
