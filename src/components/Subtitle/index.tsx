import useGetClassName from 'hooks/useGetClassName';
import { ReactElement } from 'react';
import { isLabelInProps } from 'utils';

export type Props = {
  children?: string | ReactElement;
  className?: string;
  props?: unknown;
};

const Subtitle = ({ children, className, ...props }: Props): ReactElement | null => {
  const { getClassName } = useGetClassName();

  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <h4 className={getClassName({ tag: 'h4', className })} {...isLabelInProps(props)}>
        {children}
      </h4>
    );
  }

  return children;
};

export default Subtitle;
