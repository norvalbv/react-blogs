import useGetClassName from 'hooks/useGetClassName';
import { Fragment, ReactElement } from 'react';
import { DefTheme } from 'types';

type Props = {
  data?: Record<string, unknown>;
  theme?: DefTheme;
  props?: unknown;
};

const Metadata = ({ data, theme, ...props }: Props): ReactElement | null => {
  const processedClassName = useGetClassName({ tag: 'metadata' });

  if (!data) return null;

  const MetadataComponent = theme?.overrides?.metadata?.component;

  return (
    <>
      {MetadataComponent ? (
        <MetadataComponent
          metadata={data}
          className={processedClassName}
          {...theme?.overrides?.metadata?.props}
        />
      ) : (
        <p className={processedClassName} {...props}>
          {Object.entries(data).map(([key, value], i, arr) => (
            <Fragment key={key}>
              <span>{`${key}: ${String(value)}`}</span>
              {i < arr.length - 1 && <span>•</span>}
            </Fragment>
          ))}
        </p>
      )}
    </>
  );
};

export default Metadata;
