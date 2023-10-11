import {
  frontMatterBasic,
  frontMatterBasicWithContent,
  frontMatterEmpty,
  frontMatterIncomplete,
  frontMatterIncorrectFormat,
  frontMatterJSON,
  frontMatterVoid,
} from '__mocks__/frontMatterMockData';
import praseFrontMatter from '..';
import processBlog from 'utils/processBlog';

// Test/
// categories-hello asd: hello:hi123 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123 = fail
// access areas: all : 123  = fail
// categories-hello asd: "hello:hi123 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123" = pass
// categories-hello asd: 'hello:hi123 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123' = fail
// categories-hello asd: 'hello:hi123 : 123 12£: :123:123:123:123 \'\'123\'123\'123\'123\'123\'123' = pass
// permissions: all = pass
// current time: "Thursday, December 22nd 2022, 10:09:55 pm" = pass
// user: BenjiTheGreat = pass
// current time: "Thursday,--------December 22nd 2022, 10:09:55 pm" = pass
// current time: Thursday,--------December 22nd 2022, 10:09:55 pm = fail
// current time: 'Thursday,--------December 22nd 2022, 10:09:55 pm' = pass

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
    expect(processBlog({ blog: frontMatterIncomplete }).blog.trim()).toBe(
      `---
    one: foo
    two: bar
    three: baz`.trim()
    );
  });

  test('should output data correctly with a basic yaml input', () => {
    expect(praseFrontMatter({ frontMatter: frontMatterIncorrectFormat })).toStrictEqual({
      error: 'Front Matter Not Formatted Correctly.',
    });
  });

  // test('should output data correctly with a basic yaml input', () => {
  //   expect(praseFrontMatter({ frontMatter: frontMatterBasic, delimeter: '---' })).toBe({
  //     title: 'yaml',
  //   });
  // });

  // test('should output data correctly with a basic json input', () => {
  //   expect(praseFrontMatter({ frontMatter: frontMatterJSON, delimeter: '---' })).toBe({
  //     title: 'yaml',
  //     description: 'Front Matter',
  //   });
  // });

  // test('should output data correctly with a basic yaml input', () => {
  //   expect(praseFrontMatter({ frontMatter: frontMatterBasicWithContent, delimeter: '---' })).toBe({
  //     title: 'RAM',
  //     user: 'BenjiTheGreat',
  //   });
  // });

  // test('should output data correctly with a basic yaml input', () => {
  //   expect(praseFrontMatter({ frontMatter: frontMatterEmpty, delimeter: '---' })).toBe({
  //     title: 'yaml',
  //   });
  // });
});
