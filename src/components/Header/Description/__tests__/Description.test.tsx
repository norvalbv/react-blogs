import React, { FC } from 'react';
import renderer from 'react-test-renderer';

import Description, { DescriptionProps } from '..';

const DescriptionWithAllProps: FC<Required<DescriptionProps>> = Description;

describe('<Subtitle />', () => {
  test('should render nothing if subtitle is not provided', () => {
    const tree = renderer.create(<Description />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer
      .create(
        <DescriptionWithAllProps testId="Custom description test id" className="text-sm">
          Test subtitle
        </DescriptionWithAllProps>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
