import React, { ReactElement } from 'react';
import { styles } from 'styles/themes.css';

export type SubtitleProps = {
  children?: string | ReactElement;
  className?: string;
  testId?: string;
};

const Subtitle = ({ children, className, testId }: SubtitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4 className={className || styles.h4} data-testid={testId || `${children} Subtitle`}>
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
