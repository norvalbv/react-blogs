import { useTheme } from '@emotion/react';
import React, { ReactElement } from 'react';

type Props = {
  tag: string;
};

const Badge = ({ tag }: Props): ReactElement => {
  const theme = useTheme();
  return (
    <div
      css={{
        borderRadius: '0.5rem',
        backgroundColor: theme.metadata, // Replace with the actual color code if needed
        padding: '0 0.5rem',
        fontSize: '0.75rem',
        color: theme.header, // Replace with the actual color code if needed
      }}
    >
      {tag}
    </div>
  );
};

export default Badge;
