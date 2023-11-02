import useGetClassName from 'hooks/useGetClassName';
import { ReactElement } from 'react';

type Props = {
  tag: string;
};

const Badge = ({ tag }: Props): ReactElement => {
  const { getClassName } = useGetClassName();

  return <div className={getClassName({ tag: 'badge' })}>{tag}</div>;
};

export default Badge;
