import { frontMatterBasicWithVariousTypes } from '__mocks__/frontMatterMockData';
import React from 'react';
import renderer from 'react-test-renderer';
import { processBlog } from 'utils';

import FrontMatter from '..';

describe('<FrontMatter />', () => {
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithVariousTypes })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
