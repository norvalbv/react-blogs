import { FC } from 'react';
import renderer from 'react-test-renderer';

import Subtitle, { Props } from '..';

const TitleWithAllProps: FC<Required<Props>> = Subtitle;

describe('<Subtitle />', () => {
  test('should render nothing if subtitle is not provided', () => {
    const tree = renderer.create(<Subtitle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer
      .create(
        <TitleWithAllProps
          props={{ testId: 'Test Id' }}
          theme={{
            theme: undefined,
            code: undefined,
            overrides: undefined,
          }}
          className="text-sm"
        >
          Test subtitle
        </TitleWithAllProps>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
