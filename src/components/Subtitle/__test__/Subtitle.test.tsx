import { FC } from 'react';
import renderer from 'react-test-renderer';

import Subtitle, { SubtitleProps } from '..';

const TitleWithAllProps: FC<Required<SubtitleProps>> = Subtitle;

describe('<Subtitle />', () => {
  test('should render nothing if subtitle is not provided', () => {
    const tree = renderer.create(<Subtitle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer
      .create(
        <TitleWithAllProps props={{ testId: 'Test Id' }} className="text-sm">
          Test subtitle
        </TitleWithAllProps>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
