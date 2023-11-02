import useGetClassName from 'hooks/useGetClassName';
import { ReactElement } from 'react';
import { isLabelInProps } from 'utils';

export type DescriptionProps = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
};

const Description = ({ children, className, ...props }: DescriptionProps): ReactElement | null => {
  const { getClassName } = useGetClassName();

  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <p className={getClassName({ tag: 'p' })} {...isLabelInProps(props)}>
        {children}
      </p>
    );
  }

  return children;
};

export default Description;
