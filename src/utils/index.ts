import { MarkdownToJSX } from 'markdown-to-jsx';
import { styles, themes } from 'styles/themes.css';
import { DefTheme } from 'types';

function isOverrideWithProps(
  value: MarkdownToJSX.Override
): value is { component?: React.ElementType; props: object } {
  return typeof value === 'object' && 'props' in value;
}

type Props = { tag: string; theme?: DefTheme; className?: string };

export const getClassName = ({ tag, theme, className }: Props): string | undefined => {
  if (className) return className;

  const override = theme?.overrides?.[tag];
  if (override && isOverrideWithProps(override) && 'className' in override.props) {
    return override.props.className as string;
  }

  if (!theme || styles[tag]) return undefined;

  return `${themes[theme.theme || 'PLAIN_DARK'].nodes} ${styles[tag]}`;
};

export const isLabelInProps = (props: object): object => {
  return 'label' in props ? { ...props, label: undefined } : { ...props };
};

export { default as processBlog } from './processBlog';
export { default as processLinks } from './processLinks';
