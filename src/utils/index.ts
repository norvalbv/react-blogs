import useStore from 'hooks/useStore';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { Styles, styles, themes } from 'styles/themes.css';

function isOverrideWithProps(
  value: MarkdownToJSX.Override
): value is { component?: React.ElementType; props: object } {
  return typeof value === 'object' && 'props' in value;
}

type Props = { tag: keyof Styles; className?: string };

export const getClassName = ({ tag, className }: Props): string | undefined => {
  if (className) return className;

  const theme = useStore((state) => state.theme);

  const override = theme?.overrides?.[tag];
  if (override && isOverrideWithProps(override) && 'className' in override.props) {
    return override.props.className as string;
  }

  if (!theme || !styles[tag]) return undefined;

  return `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles[tag]}`;
};

export const isLabelInProps = (props: object): object => {
  return 'label' in props ? { ...props, label: undefined } : { ...props };
};

export { default as processBlog } from './processBlog';
export { default as processLinks } from './processLinks';
