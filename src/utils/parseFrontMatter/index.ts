import { FrontMatter } from 'types';

// const KeyValueAllMatch = /^([^:]+):\s*(.*)$/;
const KeyValueMatch = /:\s*(.*)$/;

// const isValidYAMLLine = (line: string) => {
//   /**
//    * Matches the following in a the shape of [string, string, string]
//    *
//    * The full string of characters that match.
//    * The portion of the string matched by the first capturing group (text before the colon (THE KEY)).
//    * The portion of the string matched by the second capturing group (text after the colon, leading whitespace (THE VALUE)).
//    */
//   const match = line.match(KeyValueAllMatch);
//   if (!match) return false;
//   const value = match[2].trim();
//   console.log(/:/.test(value), value);
//   // if (/:/.test(value)) {
//   //
//   //   return /^["'].*[:].*["']$/.test(value);
//   // }
//   return true;
// };

// If value contains a colon, it must be enclosed in quotes or escaped

const frontMatterBasicCheck = (lines: string[], indentationLevel: number): boolean => {
  return lines.every(
    (line) =>
      !!(
        line.includes(':') ||
        line.trim().startsWith('-') ||
        line.search(/\S/) > indentationLevel ||
        line.trim().startsWith('#')
      )
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
  }
  if (processVal === 'false' || processVal === 'no') {
    return false;
  }
  if (Number(value) || Number(value) === 0) {
    return Number(value);
  }
  return value.trim();
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

  if (
    splitLines.every(
      (line) => line.trim().startsWith('-') && line.search(/\S/) === rootIndentationLevel
    )
  ) {
    return splitLines.map((line) => line.trim().slice(2));
  }

  let currentKey: string = '';
  let currentList: string[] = [];

  const processedFrontMatter = splitLines.reduce((obj, line) => {
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

      // eslint-disable-next-line no-param-reassign
      (obj as Record<string, unknown>)[key.trim()] = returnTrueValue(value);

      currentKey = key.trim();
      currentList = [];

      return obj;
    }

    if (
      (indentationLevel === rootIndentationLevel && startsWithHyphen) ||
      indentationLevel > rootIndentationLevel
    ) {
      if (!currentKey) {
        const processedT = line.trim().slice(2);

        // eslint-disable-next-line no-param-reassign
        (obj as Record<string, unknown>)[processedT] = undefined;

        currentKey = processedT;

        return obj;
      }

      const val = startsWithHyphen ? processedLine.slice(2) : processedLine;
      currentList.push(val);

      if (currentList.length && currentKey) {
        // eslint-disable-next-line no-param-reassign
        (obj as Record<string, unknown>)[currentKey] = currentList;

        currentKey = '';
      }

      return obj;
    }

    return obj;
  }, {});

  return processedFrontMatter;
};

export default praseFrontMatter;
