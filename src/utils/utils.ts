import {
  Game,
  Genre,
  PlatformDetailed,
  Publisher,
  Developer,
  MetacriticPlatform,
  releaseYearForGame,
} from '@models/game.model';

// == Format Syntax == //
export const NUMBER_REGEX = /^-?[0-9]*$/;
export const DATE_REGEX = /{{DATE(\+-?[0-9]+)?}}/;
export const DATE_REGEX_FORMATTED = /{{DATE:([^}\n\r+]*)(\+-?[0-9]+)?}}/;

export function replaceIllegalFileNameCharactersInString(text: string) {
  return text.replace(/[\\,#%&{}/*<>$":@.]/g, '').replace(/\s+/g, ' ');
}

export function makeFileName(game: Game, fileNameFormat?: string) {
  let result;
  if (fileNameFormat) {
    result = replaceVariableSyntax(game, replaceDateInString(fileNameFormat));
  } else {
    result = !game.released ? game.name : `${game.name} (${releaseYearForGame(game)})`;
  }
  return replaceIllegalFileNameCharactersInString(result) + '.md';
}

export function changeSnakeCase(game: Game) {
  return Object.entries(game).reduce((acc, [key, value]) => {
    acc[camelToSnakeCase(key)] = value;
    return acc;
  }, {});
}

export function replaceVariableSyntax(game: Game, text: string): string {
  if (!text?.trim()) {
    return '';
  }

  game.genres.toString = function (this: Genre[]) {
    return this.map(
      g =>
        `
        - ${g.name}`,
    ).join('');
  };

  game.platforms.toString = function (this: PlatformDetailed[]) {
    return this.map(p => p.platform.name).join(', ');
  };

  game.developers.toString = function (this: Developer[]) {
    return this.map(p => p.name).join(', ');
  };

  game.publishers.toString = function (this: Publisher[]) {
    return this.map(p => p.name).join(', ');
  };

  game.metacritic_platforms.toString = function (this: MetacriticPlatform[]) {
    return this.map(p => p.platform.platform.name + ': ' + p.metascore).join(', ');
  };

  game.released_year = releaseYearForGame(game);
  game.esrb_rating_name = game.esrb_rating?.name ?? '';

  const entries = Object.entries(game);

  const result = entries
    .reduce((result, [key, val = '']) => {
      return result.replace(new RegExp(`{{${key}}}`, 'ig'), val);
    }, text)
    .replace(/{{\w+}}/gi, '')
    .trim();

  return result;
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter?.toLowerCase()}`);
}

export function getDate(input?: { format?: string; offset?: number }) {
  let duration;

  if (input?.offset !== null && input?.offset !== undefined && typeof input.offset === 'number') {
    duration = window.moment.duration(input.offset, 'days');
  }

  return input?.format
    ? window.moment().add(duration).format(input?.format)
    : window.moment().add(duration).format('YYYY-MM-DD');
}

export function replaceDateInString(input: string) {
  let output: string = input;

  while (DATE_REGEX.test(output)) {
    const dateMatch = DATE_REGEX.exec(output);
    let offset = 0;

    if (dateMatch?.[1]) {
      const offsetString = dateMatch[1].replace('+', '').trim();
      const offsetIsInt = NUMBER_REGEX.test(offsetString);
      if (offsetIsInt) offset = parseInt(offsetString);
    }
    output = replacer(output, DATE_REGEX, getDate({ offset }));
  }

  while (DATE_REGEX_FORMATTED.test(output)) {
    const dateMatch = DATE_REGEX_FORMATTED.exec(output);
    const format = dateMatch?.[1];
    let offset = 0;

    if (dateMatch?.[2]) {
      const offsetString = dateMatch[2].replace('+', '').trim();
      const offsetIsInt = NUMBER_REGEX.test(offsetString);
      if (offsetIsInt) offset = parseInt(offsetString);
    }

    output = replacer(output, DATE_REGEX_FORMATTED, getDate({ format, offset }));
  }

  return output;
}

function replacer(str: string, reg: RegExp, replaceValue) {
  return str.replace(reg, function () {
    return replaceValue;
  });
}
