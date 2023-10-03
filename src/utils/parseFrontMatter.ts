export type FrontMatter = {
  Aliases: string[] | null;
  'date created': string | null;
  'date modified': string | null;
  'review-frequency': string | null;
  tags: string[] | null;
  title: string | null;
  'read time': string | null;
};

export const praseFrontMatter = (lines: string[]): FrontMatter => {
  const obj: FrontMatter = {
    Aliases: [],
    'date created': null,
    'date modified': null,
    'review-frequency': null,
    tags: [],
    title: null,
    'read time': null,
  };

  let currentKey: keyof FrontMatter;

  lines.forEach((line) => {
    if (line.startsWith('---')) {
      // Skip the delimiter lines
      return;
    }

    // splitLine will produce more than one value in an array if there is a key value pair, i.e., the only option that doesn't produce this is values for tags or aliases.
    const splitLine = line.split(':');

    if (splitLine.length > 1) {
      // The Key is always 0th index.
      currentKey = splitLine[0].trim() as keyof FrontMatter;
      const value = splitLine.slice(1).join(':').trim();

      if (value.startsWith('[' || !value)) {
        // Initialize an array for later
        obj[currentKey] = null;
      } else if (value) {
        (obj[currentKey] as string) = value;
      }
    } else if (currentKey && Array.isArray(obj[currentKey])) {
      const listItem = line.replace(/^-/, '').trim();
      if (listItem) {
        (obj[currentKey] as string[]).push(listItem);
      }
    }
  });

  return obj;
};

export default praseFrontMatter;
