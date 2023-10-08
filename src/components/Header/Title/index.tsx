import React, { ReactElement } from 'react';
import { styles } from 'styles/themes.css';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
  testId?: string;
};

const Title = ({ children, className, level = 2, testId }: TitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (level === 1) {
    return (
      <h1 className={className || styles.h1} data-testid={testId || `${children} Subtitle`}>
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={className || styles.h2} data-testid={testId || `${children} Subtitle`}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={className || styles.h3} data-testid={testId || `${children} Subtitle`}>
      {children}
    </h3>
  );
};

export default Title;
