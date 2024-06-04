import Title from 'components/Title';
import { ReactElement } from 'react';

type Props = {
  children: string[];
  className?: string;
  level: number;
  id: string;
};

const AnchorWrapper = ({ children, className, level, id }: Props): ReactElement => {
  const { origin, pathname } = window.location;

  return (
    <a href={`${origin}${pathname}#${id}`}>
      <Title className={className} level={level} id={id}>
        {children}
      </Title>
    </a>
  );
};

export default AnchorWrapper;
