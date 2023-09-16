/**
 * Helper function for conditionally creating css class strings.
 *
 * Example usage:
 *   classNames('foo', 'bar'); // => 'foo bar'
 *   classNames('foo', { bar: true }); // => 'foo bar'
 *   classNames({ 'foo-bar': true }); // => 'foo-bar'
 *   classNames({ 'foo-bar': false }); // => ''
 *   classNames({ foo: true }, { bar: true }); // => 'foo bar'
 *   classNames({ foo: true, bar: true }); // => 'foo bar'
 *
 * // lots of arguments of various types
 *   classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
 *
 * // Arrays will be recursively flattened as per the rules above
 *   classNames('a', ['b', { c: true, d: false }]); // => 'a b c'
 */

type ObjectClassName = { [key: string]: unknown };

type ClassName = string | ObjectClassName | (string | ObjectClassName)[] | boolean | undefined;

const classNames = (...args: ClassName[]): string => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (typeof arg === 'object' && arg !== null) {
      classes.push(classNames(...Object.keys(arg).filter((k) => arg[k])));
    }
  });

  return classes.filter((className) => className).join(' ');
};

export default classNames;
