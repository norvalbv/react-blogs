import classNames from 'utils/classNames';

describe('classNames should return a string when', () => {
  test('an argument of type string is provided', () => {
    expect(classNames('a')).toBe('a');
  });

  test('multiple arguments of type string are provided', () => {
    expect(classNames('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j')).toBe(
      'a b c d e f g h i j'
    );
  });

  test('an arguments of type object with 1 field is provided', () => {
    expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
  });

  test('arguments of type object and string are provided', () => {
    expect(classNames('foo', { bar: true })).toBe('foo bar');
  });

  test('multiple arguments of type object are provided', () => {
    expect(classNames({ foo: true }, { bar: true })).toBe('foo bar');
  });

  test('an arguments of type object with multiple fields is provided', () => {
    expect(classNames({ foo: true, bar: true, baz: false })).toBe('foo bar');
  });

  test('lots of arguments of various types are provided 1', () => {
    expect(classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })).toBe(
      'foo bar baz quux'
    );
  });

  test('lots of arguments of various types are provided 2', () => {
    expect(classNames('a', ['b', { c: true, d: false }])).toBe('a b c');
  });
});
