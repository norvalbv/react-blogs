import { MarkdownToJSX } from 'markdown-to-jsx';
import { DefTheme } from 'types';

function isOverrideWithProps(
  value: MarkdownToJSX.Override
): value is { component?: React.ElementType; props: Object } {
  return typeof value === 'object' && 'props' in value;
}

const getClassName = (tag: string, defTheme?: DefTheme): string => {
  const override = defTheme?.overrides?.[tag];
  if (override && isOverrideWithProps(override) && 'className' in override.props) {
    return override.props.className as string;
  }
  return '';
};

export default getClassName;
