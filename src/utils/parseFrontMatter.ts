const praseFrontMatter = (str): unknown => {
  const obj = {};
  let currentKey = null;

  const lines = str.split('\n').filter((line) => line.trim() !== '---' && line.trim() !== '');

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('-')) {
      if (currentKey) {
        obj[currentKey].push(trimmedLine.slice(1).trim());
      }
      return;
    }

    const [key, value] = line.split(':').map((s) => s.trim());

    if (value === undefined) return; // Skip malformed lines

    if (value === '') {
      obj[key] = [];
      currentKey = key;
    } else if (value === 'true' || value === 'false') {
      obj[key] = value === 'true';
      currentKey = null;
    } else if (!isNaN(Number(value))) {
      obj[key] = Number(value);
      currentKey = null;
    } else {
      obj[key] = value;
      currentKey = null;
    }
  });

  return obj;
};

export default praseFrontMatter;
