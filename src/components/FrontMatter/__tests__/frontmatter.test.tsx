import {
  frontMatterArray,
  frontMatterArrayParagraph,
  frontMatterArraysAndObjects,
  frontMatterBasicList,
  frontMatterBasicWithContent,
  frontMatterBasicWithStringTypes,
  frontMatterBasicWithVariousTypes,
  frontMatterColonWithNoSpace,
  frontMatterComplexJSON,
  frontMatterDeeplyNested,
  frontMatterEmpty,
  frontMatterEnforceNewLine,
  frontMatterFoldedBlockScalar,
  frontMatterIncomplete,
  frontMatterIncorrectIndentation,
  frontMatterIncorrectlyFormattedDeepList,
  frontMatterIndented,
  frontMatterJSON,
  frontMatterLiteralBlockScalar,
  frontMatterPreFormatted,
  frontMatterQuotedValues,
  frontMatterSpecialCharacters,
  frontMatterUnquotedValues,
  frontMatterVoid,
  frontMatterWithArrayAsKey,
  frontMatterWithComments,
  frontMatterWithDotDelim,
  frontMatterWithSemiColonDelim,
  frontMatterWithTildeDelim,
  frontMatterWithYAMLDelim,
} from '__mocks__/frontMatterMockData';
import React from 'react';
import renderer from 'react-test-renderer';
import { processBlog } from 'utils';

import FrontMatter from '..';

describe('<FrontMatter />', () => {
  /**
   * Correctly formatted basic front matter
   */
  test('should handle various basic types correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithVariousTypes })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle string types correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithStringTypes })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle array types correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArray })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle JSON formatted data correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterJSON })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should render content with basic front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicWithContent })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle list types correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterBasicList })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle indented front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterIndented })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should ignore comments in front matter', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterWithComments })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle arrays as keys correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterWithArrayAsKey })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle void front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterEmpty })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle empty front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterVoid })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  /**
   * Correctly formatted complex front matter
   */
  test('should handle folded block scalars correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterFoldedBlockScalar })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle literal block scalars correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterLiteralBlockScalar })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should enforce new lines where specified', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterEnforceNewLine })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle complex JSON data correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterComplexJSON })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle quoted values correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterQuotedValues })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle colon with no space correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterColonWithNoSpace })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle deeply nested data correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterDeeplyNested })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle arrays and objects correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArraysAndObjects })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle preformatted text correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterPreFormatted })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle array paragraphs correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterArrayParagraph })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle special characters in front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterSpecialCharacters })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  /**
   * Correctly formatted various delims front matter
   */
  test('should handle semicolon delimiters correctly', () => {
    const tree = renderer
      .create(
        <FrontMatter
          frontmatter={processBlog({ blog: frontMatterWithSemiColonDelim, delimeter: ';;;' })}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle custom YAML delimiters correctly', () => {
    const tree = renderer
      .create(
        <FrontMatter
          frontmatter={processBlog({ blog: frontMatterWithYAMLDelim, delimeter: '-- YAML --' })}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle tilde delimiters correctly', () => {
    const tree = renderer
      .create(
        <FrontMatter
          frontmatter={processBlog({ blog: frontMatterWithTildeDelim, delimeter: '~~~' })}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle dot delimiters correctly', () => {
    const tree = renderer
      .create(
        <FrontMatter
          frontmatter={processBlog({ blog: frontMatterWithDotDelim, delimeter: '...' })}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  /**
   * Incorrectly formatted basic front matter
   */
  test('should handle incomplete front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterIncomplete })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle incorrect indentation in front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterIncorrectIndentation })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should handle unquoted values in front matter correctly', () => {
    const tree = renderer
      .create(<FrontMatter frontmatter={processBlog({ blog: frontMatterUnquotedValues })} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should handle incorrectly formatted deep list in front matter correctly', () => {
    const tree = renderer
      .create(
        <FrontMatter frontmatter={processBlog({ blog: frontMatterIncorrectlyFormattedDeepList })} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
