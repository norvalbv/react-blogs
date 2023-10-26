import { ReactElement } from 'react';
import { styles } from 'styles/themes.css';

type Props = {
  tag: string;
};

const Badge = ({ tag }: Props): ReactElement => {
  return <div className={styles.badge}>{tag}</div>;
};

export default Badge;
