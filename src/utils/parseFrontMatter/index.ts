import { FrontMatter } from 'types';

/**
 *
 * Using this example:
 *
 * ---
 * title: hello
 * categories:
 *  subcategories:
 *  - dogs
 *    cats
 *    dolphins
 *  - tigers
 * ---
 *
 * Front matter guidance: https://gohugo.io/content-management/front-matter/
 * - From the above, if there is no indentation, it should be its own key,
 * - If each subsequent line that is indented ends with a colon, that should be a key within the above object
 * - if values are indentend and do not end with a colon, they should be placed within an array (or a string/number/etc if only one value) as the value for that key.
 *
 * The expected output for the above example is like so:
 *
 * { title: 'hello', categories: { subcategories: ['dogs', 'cats', 'dolphins', 'tigers'] } };
 */

const KeyValueAllMatch = /^([^:]+):\s*(.*)$/;
const KeyValueMatch = /:\s*(.*)$/;

const isValidYAMLLine = (line: string) => {
  /**
   * Matches the following in a the shape of [string, string, string]
   *
   * The full string of characters that match.
   * The portion of the string matched by the first capturing group (text before the colon (THE KEY)).
   * The portion of the string matched by the second capturing group (text after the colon, leading whitespace (THE VALUE)).
   */
  const match = line.match(KeyValueAllMatch);
  if (!match) return false;
  const value = match[2].trim();
  console.log(/:/.test(value), value);
  // if (/:/.test(value)) {
  //
  //   return /^["'].*[:].*["']$/.test(value);
  // }
  return true;
};

// If value contains a colon, it must be enclosed in quotes or escaped

const frontMatterBasicCheck = (lines: string[], indentationLevel: number): boolean => {
  return lines.every((line) =>
    line.includes(':') ||
    line.trim().startsWith('-') ||
    line.search(/\S/) > indentationLevel ||
    line.trim().startsWith('#')
      ? true
      : false
  );
};

const returnTrueValue = (value: string): boolean | string | number => {
  const processVal = value.toLowerCase().trim();

  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.replace(/^["']|["']$/g, '').trim();
  }

  if (processVal === 'true' || processVal === 'yes') {
    return true;
  } else if (processVal === 'false' || processVal === 'no') {
    return false;
  } else if (!isNaN(Number(value))) {
    return Number(value);
  } else {
    return value.trim();
  }
};

/**
 * The YAML can be placed anywhere in the documentation (although it should and is commonly placed at the top)
 * YAML keys can contain more than one word - it is up to place where it was created to determine the correct syntax
 * Indentation matters, if nothing is indented, count is a void and return no front matter.
 */

const praseFrontMatter = (frontMatter: string): FrontMatter | string[] => {
  // clean up front matter, removing whitespace around it and removing delimeters.
  const splitLines = frontMatter
    .split('\n')
    .filter((l) => l)
    .slice(1, -1);

  const rootIndentationLevel = splitLines[0].search(/\S/);

  // Basic parsing to ensure front matter is formatted correctly at a high level.
  if (!frontMatterBasicCheck(splitLines, rootIndentationLevel)) {
    return { error: 'Front Matter Not Formatted Correctly.' };
  }

  if (splitLines.every((line) => line.trim().startsWith('-'))) {
    return splitLines.map((line) => line.trim().slice(2));
  }

  let currentKey: string = '';
  let currentList: string[] = [];

  const processedFrontMatter = splitLines.reduce((obj, line, index, arr) => {
    const processedLine = line.trim();
    const startsWithHyphen = line.trim().startsWith('-');
    const isAComment = line.trim().startsWith('#');
    const indentationLevel = line.search(/\S/);

    if (isAComment) return obj;

    /**
     * Checks if the values are surrounded by quotes, otherwise it'll be counted as a voice line.
     * As we're only checking for key - values pairs on a single line ( title: bob ) it checks against their indentation level
     */
    if (indentationLevel === rootIndentationLevel && !startsWithHyphen) {
      const [key, value] = line.split(KeyValueMatch);

      console.log(value);
      (obj as Record<string, any>)[key.trim()] = returnTrueValue(value);

      currentKey = key.trim();
      currentList = [];

      return obj;
    }

    if (
      (indentationLevel === rootIndentationLevel && startsWithHyphen) ||
      indentationLevel > rootIndentationLevel
    ) {
      const val = startsWithHyphen ? processedLine.slice(2) : processedLine;
      currentList.push(val);

      if (currentList.length && currentKey) {
        (obj as Record<string, any>)[currentKey] = currentList;

        currentKey = '';
      }

      return obj;
    }

    return obj;
  }, {});

  // // If previous index within the array is a key (ends with colon)
  // if (arr[index - 1] && arr[index - 1].trim().endsWith(':') && !lineEndsWithColon) {
  //   if (processedLine.startsWith('-')) {
  //     const removeHyphen = processedLine.slice(1).trim();
  // ! This would keep replacing the value, we need a way of iterating and ensuring that the values are added within an array.
  // ? Check next value to see if it's a value and not a key or key value?

  //     key[arr[index - 1].trim().slice(0, -1)] = removeHyphen;
  //     return key;
  //   }
  //   key[removedLastChar] = processedLine;
  //   return key;
  // }

  return processedFrontMatter;
};

export default praseFrontMatter;
