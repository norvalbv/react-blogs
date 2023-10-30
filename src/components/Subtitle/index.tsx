import useGetClassName from 'hooks/useGetClassName';
import { ReactElement } from 'react';
import { isLabelInProps } from 'utils';

export type Props = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
};

const Subtitle = ({ children, className, ...props }: Props): ReactElement | null => {
  const processedClassName = useGetClassName({ tag: 'h4', className });

  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4 className={processedClassName} {...isLabelInProps(props)}>
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
