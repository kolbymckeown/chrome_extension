import Router from 'next/router';

import en from '@/translations/en.json';
import fr from '@/translations/fr.json';
import {
  objectPath,
  templateString,
  VARIABLE_STRING_REGEX,
  PLURAL_REPLACEMENT_REGEX,
  ObjectLiteral,
} from '@/utils/string';

interface GetTranslationsOptions {
  usePlural?: boolean;
}

type RouterType = {
  locale: string;
};

interface NestedLanguageObject {
  [key: string]: string | NestedLanguageObject;
}

interface Language {
  [key: string]: string | NestedLanguageObject;
}

interface Languages {
  [key: string]: Language;
}

export const LANGUAGES: Languages = {
  en,
  fr,
};

export default function getTranslations(
  path: string,
  variables?: ObjectLiteral,
  options: GetTranslationsOptions = {}
): string {
  const { locale } = Router as RouterType;

  const selectedLanguage = LANGUAGES[locale];

  let translation = objectPath(path.split('.'), selectedLanguage);

  if (!translation) {
    // console.error(`Translation at path ${path} not found`);
    return path;
  }

  const hasVariables = VARIABLE_STRING_REGEX.test(translation);
  if (hasVariables && !variables) {
    throw new Error('Translation template string has missing variables');
  }
  if (variables) {
    translation = templateString(translation, variables);
  }

  const hasPluralWords = PLURAL_REPLACEMENT_REGEX.test(translation);
  if (hasPluralWords) {
    if (options.usePlural) {
      translation = translation.replace(PLURAL_REPLACEMENT_REGEX, 's');
    } else {
      translation = translation.replace(PLURAL_REPLACEMENT_REGEX, '');
    }
  }

  return translation;
}
