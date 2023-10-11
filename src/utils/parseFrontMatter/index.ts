// Front matter is not truly strict on formation.
// Syntax can vary

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

const KeyUpToColon = /^([^;]+);/;
/**
 * Checks for key value pairs inlcuding colons.
 * 
 * For example:
 * 
 * 
 * Would Pass:
 `
    title: Users
    user: BenjiTheGreat
    url: "http://www.some-site.example/"
     current time: "Thursday, December 22nd 2022, 10:09:55 pm"
  `;

  * Would Fail:

  `
      title: Users
      user: BenjiTheGreat
      url: "http://www.some-site.example/"
      current time: "Thursday, December 22nd 2022, 10:09:55 pm"
  `;
 */
const keyValueRegex = /^(.*?):\s*(?:(?:"(.*?)")|(?:'(.*?)')|([^"\n]*))(?:\n|$)/m;

const isValidYAMLLine = (line: string) => {
  const match = line.match(/^([^:]+):\s*(.*)$/);
  if (!match) return false;
  const value = match[2].trim();
  if (/:/.test(value)) {
    // If value contains a colon, it must be enclosed in quotes
    return /^["'].*[:].*["']$/.test(value);
  }
  return true;
};

const frontMatterBasicCheck = (lines: string[], indentationLevel: number): boolean => {
  return lines.every((line) =>
    line.includes(':') || line.trim().startsWith('-') || line.search(/\S'/) > indentationLevel
      ? true
      : false
  );
};

/**
 * The YAML can be placed anywhere in the documentation (although it should and is commonly placed at the top)
 * YAML keys can contain more than one word - it is up to place where it was created to determine the correct syntax
 * Indentation matters, if nothing is indented, count is a void and return no front matter.
 */

const praseFrontMatter = ({ frontMatter }: { frontMatter: string }): FrontMatter => {
  // clean up front matter, removing whitespace around it and removing delimeters.
  const splitLines = frontMatter
    .split('\n')
    .filter((l) => l)
    .slice(1, -1);

  const indentationLevel = splitLines[0].search(/\S/);

  // Basic parsing to ensure front matter is formatted correctly at a high level.
  if (!frontMatterBasicCheck(splitLines, indentationLevel)) {
    return { error: 'Front Matter Not Formatted Correctly.' };
  }

  const processedFrontMatter = splitLines.reduce((obj, line, index, arr) => {
    const processedLine = line.trim();
    const lineEndsWithColon = processedLine.endsWith(':');

    if (isValidYAMLLine(processedLine) && line.search(/\S/) === indentationLevel) {
      const [key, value] = line.split(/:\s*/);
      (obj as Record<string, any>)[key.trim()] = value.replace(/^["']|["']$/g, '').trim();
      return obj;
    }

    /**
     * The current line is a clear key / value and is not indented
     */

    // if ()

    /**
     * Sets the key
     */
    // if (lineEndsWithColon) {
    //   key[removedLastChar] = undefined;
    //   return key;
    // }

    // console.log(arr, 'arr');

    return obj;
  }, {});

  console.log(processedFrontMatter);

  //   /**
  //    * Used for removing the colon (if it ends with it)
  //    */
  //   const removedLastChar = processedLine.slice(0, -1);

  // // console.log(processedLine, index, arr[index - 1]);

  // // If previous index within the array is a key (ends with colon)
  // if (arr[index - 1] && arr[index - 1].trim().endsWith(':') && !lineEndsWithColon) {
  //   if (processedLine.startsWith('-')) {
  //     const removeHyphen = processedLine.slice(1).trim();
  //     // ! This would keep replacing the value, we need a way of iterating and ensuring that the values are added within an array.
  //     // ? Check next value to see if it's a value and not a key or key value?
  //     // console.log(key, processedLine, arr[index - 1].trim(), arr[index - 1].trim().slice(0, -1));

  //     key[arr[index - 1].trim().slice(0, -1)] = removeHyphen;
  //     return key;
  //   }
  //   key[removedLastChar] = processedLine;
  //   // console.log('called');
  //   return key;
  // }

  // splitLine will produce more than one value in an array if there is a key value pair, i.e., the only option that doesn't produce this is values for tags or aliases.
  // const splitLine = line.split(':');

  // if (splitLine.length > 1) {
  //   // The Key is always 0th index.
  //   currentKey = splitLine[0].trim() as keyof FrontMatter;
  //   const value = splitLine.slice(1).join(':').trim();

  //   if (value.startsWith('[' || !value)) {
  //     // Initialize an array for later
  //     obj[currentKey] = null;
  //   } else if (value) {
  //     (obj[currentKey] as string) = value;
  //   }
  // } else if (currentKey && Array.isArray(obj[currentKey])) {
  //   const listItem = line.replace(/^-/, '').trim();
  //   if (listItem) {
  //     (obj[currentKey] as string[]).push(listItem);
  //   }
  // }
  // });

  return processedFrontMatter;
};

export default praseFrontMatter;
