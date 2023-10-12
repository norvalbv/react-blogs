import {
  frontMatterBasic,
  frontMatterBasicListHyphenated,
  frontMatterBasicWithContent,
  frontMatterComplexJSON,
  frontMatterEmpty,
  frontMatterEscapedChars,
  frontMatterIncomplete,
  frontMatterIncorrectFormat,
  frontMatterIndented,
  frontMatterJSON,
  frontMatterQuotedValues,
  frontMatterSpecialCharacters,
  frontMatterUnquotedValues,
  frontMatterVoid,
  frontMatterWithDotDelim,
  frontMatterWithSemiColonDelim,
  frontMatterWithTildeDelim,
  frontMatterWithYAMLDelim,
} from '__mocks__/frontMatterMockData';
import praseFrontMatter from '..';
import processBlog from 'utils/processBlog';

describe('parseFrontMatter', () => {
  test('should output no front matter with a void yaml input', () => {
    expect(processBlog({ blog: frontMatterVoid })).toStrictEqual({
      blog: 'No Front Matter',
      frontMatter: null,
    });
  });

  test('should output no front matter with a empty string', () => {
    expect(processBlog({ blog: frontMatterEmpty })).toStrictEqual({
      blog: '',
      frontMatter: null,
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(processBlog({ blog: frontMatterIncomplete })).toStrictEqual({
      blog: `
    ---
    one: foo
    two: bar
    three: baz
`,
      frontMatter: null,
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterIncorrectFormat })).toStrictEqual({
      error: 'Front Matter Not Formatted Correctly.',
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterBasic })).toStrictEqual({
      title: 'yaml',
      job: 'software engineer',
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(processBlog({ blog: frontMatterBasicWithContent })).toStrictEqual({
      blog: 'Content',
      frontMatter: {
        title: 'RAM',
        user: 'BenjiTheGreat',
      },
    });
  });

  test('should output no front matter with a empty string', () => {
    expect(processBlog({ blog: frontMatterWithSemiColonDelim, delimeter: ';;;' })).toStrictEqual({
      blog: '',
      frontMatter: { title: 'custom-delim', user: 'BenjiTheGreat' },
    });
  });

  test('should output no front matter with a empty string', () => {
    expect(processBlog({ blog: frontMatterWithTildeDelim, delimeter: '~~~' })).toStrictEqual({
      blog: '',
      frontMatter: {
        title: 'custom-delims',
        foo: 'bar',
        version: '2',
      },
    });
  });

  test('should output no front matter with a empty string', () => {
    expect(processBlog({ blog: frontMatterWithDotDelim, delimeter: '...' })).toStrictEqual({
      blog: '',
      frontMatter: {
        foo: 'bar',
        title: 'custom-delims',
        version: '2',
      },
    });
  });

  test('should output no front matter with a empty string', () => {
    expect(processBlog({ blog: frontMatterWithYAMLDelim, delimeter: '-- YAML --' })).toStrictEqual({
      blog: '',
      frontMatter: { title: 'YAML', user: 'BenjiTheGreat' },
    });
  });

  // test('should output data correctly with a basic yaml input', () => {
  //   expect(praseFrontMatter({ frontMatter: frontMatterUnquotedValues })).toStrictEqual({
  //     error: 'Front Matter Not Formatted Correctly.',
  //   });
  // });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterEscapedChars })).toStrictEqual({
      'more-random-chars': "hello:hi123 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123",
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterQuotedValues })).toStrictEqual({
      'with-random-chars': 'this-is-a-test 123 : 456: abc - 890!',
      'current time': 'Thursday, December 22nd 2022, 10:09:56 pm',
      'time tomorrow': 'Friday,--------December 23nd 2022, 10:09:55 pm',
      'access areas': 'all : 123',
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterSpecialCharacters })).toStrictEqual({
      title: "!@£$%^&*()[]{};':|,./<>?`~",
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterBasicListHyphenated })).toStrictEqual({
      title: 'RAM',
      users: ['BenjiTheGreat', 'Steve_The_Great', 'John The Great'],
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterIndented })).toStrictEqual({
      title: 'RAM',
      users: ['BenjiTheGreat', 'Steve_The_Great', 'John The Great'],
    });
  });

  test('should output data correctly with a basic json input', () => {
    expect(processBlog({ blog: frontMatterJSON })).toStrictEqual({
      blog: '# This page has JSON front matter!',
      frontMatter: {
        title: 'JSON',
        description: 'Front Matter',
      },
    });
  });

  test('should output data correctly with a basic json input', () => {
    expect(processBlog({ blog: frontMatterComplexJSON })).toStrictEqual({
      blog: '',
      frontMatter: {
        cascade: [
          {
            _target: {
              kind: 'page',
              lang: 'en',
              path: '/blog/**',
            },
            background: 'yosemite.jpg',
          },
          {
            _target: {
              kind: 'section',
            },
            background: 'goldenbridge.jpg',
          },
        ],
        title: 'Blog',
      },
    });
  });
});
