import React, { ReactElement } from 'react';

type Props = {
  tag: string;
};

const Badge = ({ tag }: Props): ReactElement => {
  return (
    <div
      style={{
        borderRadius: '0.5rem',
        backgroundColor: 'red',
        padding: '0 0.5rem',
        fontSize: '0.75rem',
        color: 'white',
        width: 'auto',
      }}
    >
      {tag}
    </div>
  );
};

export default Badge;
