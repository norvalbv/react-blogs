type Options = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
};
type FormatTypes = {
  long: Options;
  short: Options;
  timeOnly: Options;
};

type ConvertToDate = {
  timestamp: number;
  convertTimestampToMilli?: boolean;
  format?: {
    type: keyof FormatTypes | 'custom';
    customValues?: Options;
  };
};

// Convert (epoch) timestamp to date
export const convertToDate = ({
  timestamp,
  convertTimestampToMilli,
  format,
}: ConvertToDate): string => {
  let options: Options;

  if (format?.type === 'custom') {
    options = {
      year: format.customValues?.year,
      month: format.customValues?.month,
      day: format.customValues?.day,
      hour: format.customValues?.hour,
      minute: format.customValues?.minute,
      second: format.customValues?.second,
      hourCycle: format.customValues?.hourCycle,
    };
  } else {
    options = format?.type ? typeMap[format.type] : typeMap.long;
  }

  // Force to use 12 hour cycle time format for 'en-GB' locale, as the `Intl` uses 24 hours cycle time for the locale.
  // No need to change the date format as it already formatted according to the defined locale.
  if (
    navigator.language === 'en-GB' &&
    format?.customValues?.hourCycle !== 'h23' &&
    format?.customValues?.hourCycle !== 'h24' &&
    format?.type !== 'timeOnly'
  ) {
    options.hourCycle = 'h12';
  }

  const date = Intl.DateTimeFormat(navigator.language, options).format(
    convertTimestampToMilli ? timestamp * 1000 : timestamp
  );

  return date;
};

const typeMap: FormatTypes = {
  long: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
  short: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
  timeOnly: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  },
};
