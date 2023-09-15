import React, { FC } from 'react';
import renderer from 'react-test-renderer';

import Title, { TitleProps } from '..';

const TitleWithAllProps: FC<Required<TitleProps>> = Title;

describe('<Title />', () => {
  test('should render nothing if title is not provided', () => {
    const tree = renderer.create(<Title />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer
      .create(
        <TitleWithAllProps className="text-h2" level={1}>
          Test title
        </TitleWithAllProps>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
