import React, { ReactElement } from 'react';
import { DefTheme } from 'types';
import { getClassName, isLabelInProps } from 'utils';

export type DescriptionProps = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
  theme?: DefTheme;
};

const Description = ({
  children,
  className,
  theme,
  ...props
}: DescriptionProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <p className={getClassName({ tag: 'h1', theme, className })} {...isLabelInProps(props)}>
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
