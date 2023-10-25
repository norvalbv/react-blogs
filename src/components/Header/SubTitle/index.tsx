import React, { ReactElement } from 'react';
import { DefTheme } from 'types';
import { getClassName, isLabelInProps } from 'utils';

export type SubtitleProps = {
  children?: string | ReactElement;
  className?: string;
  theme?: DefTheme;
  props?: unknown;
};

const Subtitle = ({ children, className, theme, ...props }: SubtitleProps): ReactElement | null => {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4 className={getClassName({ tag: 'h1', theme, className })} {...isLabelInProps(props)}>
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
