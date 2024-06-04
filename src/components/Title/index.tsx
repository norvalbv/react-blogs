import { ReactElement } from 'react';

type Props = {
  children: string[];
  className?: string;
  level: number;
  id: string;
};

const Title = ({ children, className, level, id }: Props): ReactElement => {
  switch (level) {
    case 1:
      return (
        <h1 className={className} id={id}>
          {children[0]}
        </h1>
      );
    case 2:
      return (
        <h2 className={className} id={id}>
          {children[0]}
        </h2>
      );
    case 3:
      return (
        <h3 className={className} id={id}>
          {children[0]}
        </h3>
      );
    case 4:
      return (
        <h4 className={className} id={id}>
          {children[0]}
        </h4>
      );
    case 5:
      return (
        <h5 className={className} id={id}>
          {children[0]}
        </h5>
      );
    default:
      return (
        <h6 className={className} id={id}>
          {children[0]}
        </h6>
      );
  }
};

export default Title;
