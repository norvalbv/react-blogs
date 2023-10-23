import React, { FC } from 'react';
import renderer from 'react-test-renderer';

import Header, { HeaderProps } from '..';

const HeaderWithAllProps: FC<Required<HeaderProps>> = Header;

describe('<Header />', () => {
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with title provided', () => {
    const tree = renderer.create(<Header title={{ label: 'Test title' }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with subtitle provided', () => {
    const tree = renderer.create(<Header subtitle={{ label: 'Test subtitle' }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer
      .create(
        <HeaderWithAllProps
          className="grid grid-cols-1 gap-1"
          title={{ label: 'Test title', className: 'text-2xl' }}
          subtitle={{ label: 'Test subtitle', className: 'text-sm' }}
          description={{ label: 'Test Description', className: 'text-neutral-500' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
