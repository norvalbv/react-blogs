import { Styles, styles, customThemes } from 'styles/themes.css';
import { JSXOverrides } from 'types';
import { useStore } from './useStore';

type Props = { tag: keyof JSXOverrides; className?: string };

type ReturnType = {
  getClassName: (args: Props) => string | undefined;
};

const useGetClassName = (): ReturnType => {
  const theme = useStore((state) => state.theme);

  const getClassName = ({ tag, className }: Props): string | undefined => {
    if (className) return className;

    const override = theme?.overrides?.[tag];
    if (
      override &&
      typeof override === 'object' &&
      override.props &&
      'className' in override.props &&
      typeof override.props.className === 'string'
    ) {
      return override.props.className;
    }

    if (!theme || !(tag in styles)) return undefined;

    return `${customThemes[theme.theme || 'PLAIN_DARK'].nodes} ${styles[tag as keyof Styles]}`;
  };

  return { getClassName };
};

export default useGetClassName;
