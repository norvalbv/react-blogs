import useStore from 'hooks/useStore';
import { ReactElement } from 'react';
import { styles, themes } from 'styles/themes.css';

type BadgeProps = {
  tag: string;
};

const Badge = ({ tag }: BadgeProps): ReactElement => {
  const theme = useStore((state) => state.theme);
  return (
    <div className={`${themes[theme?.theme || 'PLAIN_DARK'].nodes} ${styles.badge}`}>{tag}</div>
  );
};

export default Badge;
