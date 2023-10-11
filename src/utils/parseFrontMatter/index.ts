import { FrontMatter } from 'types';

// Front matter is not truly strict on formation.
// Syntax can vary

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

type ReturnValue = {
  blog: string;
  frontMatter: FrontMatter;
};

type Props = {
  blog: string;
  delimeter?: string;
};

/**
 * The YAML can be placed anywhere in the documentation (although it should and is commonly placed at the top)
 * YAML keys can contain more than one word - it is up to place where it was created to determine the correct syntax
 * Indentation matters, if nothing is indented, count is a void and return no front matter.
 */

const praseFrontMatter = ({ blog, delimeter = '---' }: Props): ReturnValue => {
  // https://jsbenchmark.com/#eyJjYXNlcyI6W3siaWQiOiJ0dHNwS19hY29RQWhZZlZFczhWSmgiLCJjb2RlIjoiWy4uLkRBVEEubWF0Y2hBbGwoLz0geWFtbCA9fC0tLS9naSldLm1hcChtYXRjaCA9PiBtYXRjaC5pbmRleCk7XG4iLCJuYW1lIjoiRmluZCA0OTkifSx7ImlkIjoiaHZqbWd3MmJ6TTJhdUUyNzFpd1ZZIiwiY29kZSI6IkRBVEEuc3BsaXQoJ1xcbicpLm1hcCgobGluZSwgaSkgPT4gKGxpbmUgPT09IC89IHlhbWwgPXwtLS0vZ2kgPyBpIDogdW5kZWZpbmVkKSkuZmlsdGVyKGkgPT4gaSAhPT0gdW5kZWZpbmVkKTsiLCJkZXBlbmRlbmNpZXMiOltdfSx7ImlkIjoiZlcxYzFQNGdEdlR5WGVBdkM3cjc3IiwiY29kZSI6IlsuLi5EQVRBLm1hdGNoQWxsKC89IHlhbWwgPXwtLS0vZ2kpXS5tYXAobWF0Y2ggPT4gKHtcbiAgbWF0Y2g6IG1hdGNoWzBdLFxuICBpbmRleDogbWF0Y2guaW5kZXhcbn0pKTtcbiIsImRlcGVuZGVuY2llcyI6W119LHsiaWQiOiJYLWlVS3JHSEYzX2IxeTBZei0yVVciLCJjb2RlIjoiREFUQS5zcGxpdCgnXFxuJykuZmxhdE1hcCgobGluZSwgaSkgPT4gKGxpbmUgPT09IC89IHlhbWwgPXwtLS0vZ2kgPyBpIDogW10pKS5maWx0ZXIoaSA9PiBpICE9PSB1bmRlZmluZWQpOyIsImRlcGVuZGVuY2llcyI6W119LHsiaWQiOiJGa2pqRjNvOFB1V3EySG5aYmtHOTQiLCJjb2RlIjoiREFUQS5zcGxpdCgnXFxuJykucmVkdWNlKChhY2MsIGxpbmUsIGkpID0+IHtcbiAgaWYgKC89IHlhbWwgPXwtLS0vZ2kudGVzdChsaW5lKSkge1xuICAgIGFjYy5wdXNoKGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59LCBbXSk7IiwiZGVwZW5kZW5jaWVzIjpbXX0seyJpZCI6Ik14NGtnUG52amZJblFybWVwMnZaZyIsImNvZGUiOiJjb25zdCBsaW5lcyA9IERBVEEuc3BsaXQoJ1xcbicpO1xuY29uc3QgaW5kaWNlcyA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gIGlmICgvPSB5YW1sID18LS0tL2dpLnRlc3QobGluZXNbaV0pKSB7XG4gICAgaW5kaWNlcy5wdXNoKGkpO1xuICB9XG59IiwiZGVwZW5kZW5jaWVzIjpbXX1dLCJjb25maWciOnsibmFtZSI6IlNpbXBsZSBleGFtcGxlIHRlc3QiLCJwYXJhbGxlbCI6dHJ1ZSwiZ2xvYmFsVGVzdENvbmZpZyI6eyJkZXBlbmRlbmNpZXMiOltdfSwiZGF0YUNvZGUiOiJyZXR1cm4gYFxuICAtLS1cbiAgYWJjZGVmZ2hpamtsbW5vcXByc3R1dnd4eXpcbiAgMTIzNDU2Nzg5MFxuICAgIC0tLVxuICBhYmNkZWZnaGlqa2xtbm9xcHJzdHV2d3h5elxuICAxMjM0NTY3ODkwXG4gICAgLS0tXG4gIGFiY2RlZmdoaWprbG1ub3FwcnN0dXZ3eHl6XG4gIDEyMzQ1Njc4OTBcbiAgICAtLS1cbiAgYWJjZGVmZ2hpamtsbW5vcXByc3R1dnd4eXpcbiAgMTIzNDU2Nzg5MFxuICAgIC0tLVxuICBhYmNkZWZnaGlqa2xtbm9xcHJzdHV2d3h5elxuICAxMjM0NTY3ODkwXG4gICAgLS0tXG4gIGFiY2RlZmdoaWprbG1ub3FwcnN0dXZ3eHl6XG4gIDEyMzQ1Njc4OTBcbiAgICAtLS1cbiAgYWJjZGVmZ2hpamtsbW5vcXByc3R1dnd4eXpcbiAgMTIzNDU2Nzg5MFxuICAgIC0tLVxuICBhYmNkZWZnaGlqa2xtbm9xcHJzdHV2d3h5elxuICAxMjM0NTY3ODkwXG4gICAgLS0tXG4gIGFiY2RlZmdoaWprbG1ub3FwcnN0dXZ3eHl6XG4gIDEyMzQ1Njc4OTBcbiAgICAtLS1cbiAgYWJjZGVmZ2hpamtsbW5vcXByc3R1dnd4eXpcbiAgMTIzNDU2Nzg5MFxuICAgIC0tLVxuICBhYmNkZWZnaGlqa2xtbm9xcHJzdHV2d3h5elxuICAxMjM0NTY3ODkwXG5gOyJ9fQ==
  // Best performing bench mark
  const frontMatterIndexes = [...blog.matchAll(new RegExp(delimeter, 'g'))].map(
    (match) => match.index
  );

  // Contains no front matter
  if (frontMatterIndexes.length < 2) {
    return {
      blog,
      frontMatter: null,
    };
  }

  const frontMatter = blog.slice(0, (frontMatterIndexes[1] || 0) + 3);
  const processedBlog = blog.slice((frontMatterIndexes[1] || 0) + 3);

  const t = blog.split('\n').reduce((key, line, index, arr) => {
    const processedLine = line.trim();

    if (processedLine === delimeter) return key;

    /**
     * Checks the indentation against the first value (excluding delimeter)
     */
    const indentationLevel =
      arr[arr.map((d) => d.trim()).indexOf(delimeter.trim()) + 1].search(/\S/);
    const lineEndsWithColon = processedLine.endsWith(':');
    /**
     * Used for removing the colon (if it ends with it)
     */
    const removedLastChar = processedLine.slice(0, -1);

    /**
     * Sets the key
     */
    if (lineEndsWithColon) {
      key[removedLastChar] = undefined;
      return key;
    }
    // console.log(processedLine, index, arr[index - 1]);

    // If previous index within the array is a key (ends with colon)
    if (arr[index - 1] && arr[index - 1].trim().endsWith(':') && !lineEndsWithColon) {
      if (processedLine.startsWith('-')) {
        const removeHyphen = processedLine.slice(1).trim();
        // ! This would keep replacing the value, we need a way of iterating and ensuring that the values are added within an array.
        // ? Check next value to see if it's a value and not a key or key value?
        // console.log(key, processedLine, arr[index - 1].trim(), arr[index - 1].trim().slice(0, -1));

        key[arr[index - 1].trim().slice(0, -1)] = removeHyphen;
        return key;
      }
      key[removedLastChar] = processedLine;
      // console.log('called');
      return key;
    }

    return key;
  }, {});

  console.log(t, 'test');

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

  return { processedBlog, frontMatter };
};

export default praseFrontMatter;
