import React, { Fragment, ReactElement } from 'react';
import { Blog, DefTheme } from 'types';
import { getClassName } from 'utils';

type Props = {
  data: Blog;
  theme?: DefTheme;
  props?: unknown;
};

const Metadata = ({ data, theme, ...props }: Props): ReactElement | null => {
  if (!data) return null;

  const MetadataComponent = theme?.overrides?.metadata?.component;

  return (
    <>
      {MetadataComponent ? (
        <MetadataComponent
          metadata={data.metadata}
          className={getClassName({ tag: 'metadata', theme })}
          {...theme?.overrides?.metadata?.props}
        />
      ) : (
        <p className={getClassName({ tag: 'metadata', theme })} {...props}>
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
