import React, { ReactElement } from 'react';
import { getClassName, isLabelInProps } from 'utils';

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
      <p className={getClassName({ tag: 'h1', className })} {...isLabelInProps(props)}>
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
