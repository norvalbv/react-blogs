import {
  frontMatterArray,
  frontMatterArrayParagraph,
  frontMatterArraysAndObjects,
  frontMatterBasicList,
  frontMatterBasicWithContent,
  frontMatterBasicWithStringTypes,
  frontMatterBasicWithVariousTypes,
  frontMatterColonWithNoSpace,
  frontMatterComplex,
  frontMatterComplexJSON,
  frontMatterDeeplyNested,
  frontMatterEnforceNewLine,
  frontMatterEscapedChars,
  frontMatterFoldedBlockScalar,
  frontMatterIndented,
  frontMatterJSON,
  frontMatterLiteralBlockScalar,
  frontMatterPreFormatted,
  frontMatterQuotedValues,
  frontMatterWithArrayAsKey,
  frontMatterWithComments,
} from '__mocks__/frontMatterMockData';
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
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithStringTypes })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArray })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterJSON })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithContent })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicList })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterIndented })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterWithComments })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterWithArrayAsKey })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  // ! Need to check
  // TODO
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterFoldedBlockScalar })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterLiteralBlockScalar })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterEnforceNewLine })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterComplexJSON })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterQuotedValues })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render nothing if title and subtitle are not provided', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterColonWithNoSpace })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  // // ! I dont think this is working
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterEscapedChars })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterEscapedChars })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterDeeplyNested })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArraysAndObjects })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterPreFormatted })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // // ! I don't think this is working
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArrayParagraph })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // test('should render nothing if title and subtitle are not provided', () => {
  //   const tree = renderer
  //     .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterComplex })} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
