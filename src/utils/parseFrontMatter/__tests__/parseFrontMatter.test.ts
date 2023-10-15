import {
  frontMatterArrayParagraph,
  frontMatterArraysAndObjects,
  frontMatterBasicListHyphenated,
  frontMatterBasicWithContent,
  frontMatterBasicWithStringTypes,
  frontMatterBasicWithVariousTypes,
  frontMatterComplexJSON,
  frontMatterEmpty,
  frontMatterEscapedChars,
  frontMatterIncomplete,
  frontMatterIncorrectIndentation,
  frontMatterIndented,
  frontMatterJSON,
  frontMatterNoKey,
  frontMatterNumerousIndented,
  frontMatterPreFormatted,
  frontMatterQuotedValues,
  frontMatterSpecialCharacters,
  frontMatterVoid,
  frontMatterWithArrayAsKey,
  frontMatterWithComments,
  frontMatterWithDotDelim,
  frontMatterWithSemiColonDelim,
  frontMatterWithTildeDelim,
  frontMatterWithYAMLDelim,
} from '__mocks__/frontMatterMockData';
import processBlog from 'utils/processBlog';
import praseFrontMatter from '..';

// ? Questions
// How munch indentation are we allowed?

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

  test('should output incomplete front matter as blog', () => {
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

  test('should output error for incorrectly formatted front matter', () => {
    expect(praseFrontMatter(frontMatterIncorrectIndentation)).toStrictEqual({
      error: 'Front Matter Not Formatted Correctly.',
    });
  });

  // test('should output error for incorrectly formatted front matter', () => {
  //   expect(praseFrontMatter(frontMatterArraysAndObjects)).toStrictEqual({
  //     foo: 'whatever',
  //     bar: [
  //       {
  //         fruit: 'apple',
  //         name: 'steve',
  //         sport: 'baseball',
  //       },
  //       'more',
  //       {
  //         python: 'rocks',
  //         perl: 'papers',
  //         ruby: 'scissorses',
  //       },
  //     ],
  //   });
  // });

  // test('should output error for incorrectly formatted front matter', () => {
  //   expect(praseFrontMatter(frontMatterWithArrayAsKey)).toStrictEqual([
  //     { 'work on YAML.py': ['work on Store'] },
  //   ]);
  // });

  test('should output error for incorrectly formatted front matter', () => {
    expect(praseFrontMatter(frontMatterNoKey)).toStrictEqual(['apple', 'banana', 'carrot']);
  });

  test('should output error for incorrectly formatted front matter', () => {
    expect(praseFrontMatter(frontMatterArrayParagraph)).toStrictEqual([
      "What's Yaml?",
      "It's for writing data structures in plain text.",
      'And?',
      "And what? That's not good enough for you?",
      'No, I mean, "And what about Yaml?"',
      'Oh, oh yeah. Uh.. Yaml for Ruby.',
    ]);
  });

  // test('should output error for incorrectly formatted front matter', () => {
  //   expect(praseFrontMatter(frontMatterPreFormatted)).toStrictEqual({
  //     title: { label: 'hello', color: 'red' },
  //     users: ['benji', 'bob', 'mike'],
  //   });
  // });

  test('should output data correctly with a basic front matter input of various types', () => {
    expect(praseFrontMatter(frontMatterBasicWithVariousTypes)).toStrictEqual({
      job: 'software engineer',
      doesProgram: true,
      number: 10,
    });
  });

  test('should output data correctly with a basic front matter input of fixed types', () => {
    expect(praseFrontMatter(frontMatterBasicWithStringTypes)).toStrictEqual({
      job: 'software engineer',
      doesProgram: 'true',
      number: '10',
    });
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(processBlog({ blog: frontMatterBasicWithContent })).toStrictEqual({
      blog: 'Content',
      frontMatter: {
        title: 'Admin',
        user: 'BenjiTheGreat',
      },
    });
  });

  test('should output front matter with semi colon delimeter', () => {
    expect(processBlog({ blog: frontMatterWithSemiColonDelim, delimeter: ';;;' })).toStrictEqual({
      blog: '',
      frontMatter: { title: 'custom-delim', user: 'BenjiTheGreat' },
    });
  });

  test('should output front matter with tilde delimeter', () => {
    expect(processBlog({ blog: frontMatterWithTildeDelim, delimeter: '~~~' })).toStrictEqual({
      blog: '',
      frontMatter: {
        title: 'custom-delims',
        foo: 'bar',
        version: 2,
      },
    });
  });

  test('should output front matter with elipsis delimeter', () => {
    expect(processBlog({ blog: frontMatterWithDotDelim, delimeter: '...' })).toStrictEqual({
      blog: '',
      frontMatter: {
        foo: 'bar',
        title: 'custom-delims',
        version: 2,
      },
    });
  });

  test('should output front matter with YAML delimeter', () => {
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

  test('should output front matter correctly with escaped chars', () => {
    expect(praseFrontMatter(frontMatterEscapedChars)).toStrictEqual({
      'more-random-chars': "hello:654 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123",
    });
  });

  test('should output front matter correctly with values surrounded by quotes', () => {
    expect(praseFrontMatter(frontMatterQuotedValues)).toStrictEqual({
      'with-random-chars': 'this-is-a-test 123 : 456: abc - 890!',
      'current time': 'Thursday, December 22nd 2022, 10:09:56 pm',
      'time tomorrow': 'Friday,--------December 23nd 2022, 10:09:55 pm',
      'access areas': 'all : 123',
    });
  });

  // ! Is this the required output?
  test('should output front matter correctly with special chars', () => {
    expect(praseFrontMatter(frontMatterSpecialCharacters)).toStrictEqual({
      title: "!@£$%^&*()[]{};':|,./<>?`~",
    });
  });

  test('should output front matter correctly with a basic list', () => {
    expect(praseFrontMatter(frontMatterBasicListHyphenated)).toStrictEqual({
      title: 'Members',
      users: ['BenjiTheGreat', 'Steve_The_Great', 'John The Great'],
    });
  });

  test('should output front matter correctly with a basic indented list', () => {
    expect(praseFrontMatter(frontMatterIndented)).toStrictEqual({
      title: 'Members',
      users: ['BenjiTheGreat', 'Steve_The_Great', 'John The Great'],
    });
  });

  test('should output data correctly with JSON front matter', () => {
    expect(processBlog({ blog: frontMatterJSON })).toStrictEqual({
      blog: '# This page has JSON front matter!',
      frontMatter: {
        title: 'JSON',
        description: 'Front Matter',
      },
    });
  });

  test('should output data correctly with complex JSON front matter', () => {
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

  test('should output front matter correctly with numerous indented lists', () => {
    expect(praseFrontMatter(frontMatterNumerousIndented)).toStrictEqual({
      title: 'Members',
      users: ['BenjiTheGreat', 'Steve_The_Great', 'John The Great'],
      permissions: ['members area', 'chat'],
    });
  });

  // test('should output data correctly with a deeply nested list', () => {
  //   expect(praseFrontMatter(frontMatterDeeplyNested)).toStrictEqual({
  //      title: 'JSON',
  //      description: 'Front Matter',
  //   });
  // });

  // test('should output data correctly with a deeply nested list with hyphens', () => {
  //   expect(praseFrontMatter(frontMatterDeeplyNestedWithHyphens)).toStrictEqual({
  //     title: 'Users',
  //     user: {
  //       group: [{ permissions: 'all' }, { 'access areas': 'all' }],
  //       timezone: 'GMT',
  //     },
  //   });
  // });

  // test('should output data correctly with a deeply nested list with hyphens', () => {
  //   expect(praseFrontMatter(frontMatterVariousDelim)).toStrictEqual({
  //     title: 'Users',
  //     user: {
  //       group: [{ permissions: 'all' }, { 'access areas': 'all' }],
  //       timezone: 'GMT',
  //     },
  //   });
  // });

  // test('should output data correctly with a deeply nested list', () => {
  //   expect(praseFrontMatter(frontMatterIncorrectlyFormatedDeepList)).toStrictEqual({
  //     title: "Users"
  //     user: "BenjiTheGreat",
  //         group: admin
  //         -  permissions: all
  //         -  access areas: all
  //         timezone: GMT
  //   });
  // });

  test('should output front matter correctly with comments', () => {
    expect(praseFrontMatter(frontMatterWithComments)).toStrictEqual({
      title: 'Admins',
      users: 'BenjiTheGreat',
    });
  });
});
