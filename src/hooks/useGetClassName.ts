import { Styles, styles, themes } from 'styles/themes.css';
import { isOverrideWithProps } from 'utils';
import { useStore } from './useStore';

type Props = { tag: keyof Styles; className?: string };

type ReturnType = {
  getClassName: (args: Props) => string | undefined;
};

const useGetClassName = (): ReturnType => {
  const theme = useStore((state) => state.theme);

  const getClassName = ({ tag, className }: Props): string | undefined => {
    if (className) return className;

    const override = theme?.overrides?.[tag];
    if (override && isOverrideWithProps(override) && 'className' in override.props) {
      return override.props.className as string;
    }

    if (!theme || !styles[tag]) return undefined;

    return `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles[tag]}`;
  };

  return { getClassName };
};

export default useGetClassName;
