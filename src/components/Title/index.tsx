import React, { ReactElement } from 'react';
import { DefTheme } from 'types';
import { getClassName, isLabelInProps } from 'utils';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
  theme?: DefTheme;
  props?: unknown;
};

const Title = ({
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
      <h1 className={getClassName({ tag: 'h1', theme, className })} {...isLabelInProps(props)}>
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={getClassName({ tag: 'h2', theme, className })} {...isLabelInProps(props)}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={getClassName({ tag: 'h3', theme, className })} {...isLabelInProps(props)}>
      {children}
    </h3>
  );
};

export default Title;
