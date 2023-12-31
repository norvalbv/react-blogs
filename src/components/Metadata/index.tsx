import useGetClassName from 'hooks/useGetClassName';
import { Fragment, ReactElement } from 'react';
import { DefTheme } from 'types';

type MetadataProps = {
  children?: Record<string, unknown>;
  theme?: DefTheme;
  props?: unknown;
};

const Metadata = ({ children, theme, ...props }: MetadataProps): ReactElement | null => {
  const { getClassName } = useGetClassName();

  if (!children) return null;

  return (
    <p className={getClassName({ tag: 'metadata' })} {...props}>
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
