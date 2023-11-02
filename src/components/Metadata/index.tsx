import useGetClassName from 'hooks/useGetClassName';
import { Fragment, ReactElement } from 'react';
import { DefTheme } from 'types';

type Props = {
  children?: Record<string, unknown>;
  theme?: DefTheme;
  props?: unknown;
};

const Metadata = ({ children, theme, ...props }: Props): ReactElement | null => {
  const processedClassName = useGetClassName({ tag: 'metadata' });

  if (!children) return null;

  return (
    <p className={processedClassName} {...props}>
      {Object.entries(children).map(([key, value], i, arr) => (
        <Fragment key={key}>
          <span>{`${key}: ${String(value)}`}</span>
          {i < arr.length - 1 && <span>•</span>}
        </Fragment>
      ))}
    </p>
  );
};

export default Metadata;
