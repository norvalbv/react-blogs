export const isLabelInProps = (props: object): object => {
  return 'label' in props ? { ...props, label: undefined } : { ...props };
};

export { default as processBlog } from './processBlog';
export { default as processLinks } from './processLinks';
