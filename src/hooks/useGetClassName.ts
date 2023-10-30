import { Styles, styles, themes } from 'styles/themes.css';
import { isOverrideWithProps } from 'utils';
import useStore from './useTheme';

type Props = { tag: keyof Styles; className?: string };

const useGetClassName = ({ tag, className }: Props): string | undefined => {
  const theme = useStore((state) => state.theme);

  if (className) return className;

  const override = theme?.overrides?.[tag];
  if (override && isOverrideWithProps(override) && 'className' in override.props) {
    return override.props.className as string;
  }

  if (!theme || !styles[tag]) return undefined;

  return `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles[tag]}`;
};

export default useGetClassName;
