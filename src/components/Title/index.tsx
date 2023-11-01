import useGetClassName from 'hooks/useGetClassName';
import { ReactElement, useState } from 'react';
import { isLabelInProps } from 'utils';

export type TitleProps = {
  children?: string | ReactElement;
  className?: string;
  /**
   * Default 2.
   */
  level?: 1 | 2 | 3;
  props?: unknown;
};

export const Title = ({
  children,
  className,
  level = 2,
  ...props
}: TitleProps): ReactElement | null => {
  const [test, setTest] = useState(false);
  const processedClassName = useGetClassName({ tag: `h${level}`, className });

  if (!children) {
    return null;
  }

  if (level === 1) {
    return (
      <h1
        className={processedClassName}
        {...isLabelInProps(props)}
        onClick={(): void => setTest(!test)}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2 className={processedClassName} {...isLabelInProps(props)}>
        {children}
      </h2>
    );
  }

  return (
    <h3 className={processedClassName} {...isLabelInProps(props)}>
      {children}
    </h3>
  );
};
