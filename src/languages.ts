import path from "node:path";
import { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES, SITE, type LText } from "./consts";
export { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES };

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(langPathRegex);
  const langCode = langCodeMatch ? langCodeMatch[1] : "en";
  return langCode as (typeof KNOWN_LANGUAGE_CODES)[number];
}

export function getPathParamsFromId(pathname: string) {
  const strippedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const ext = path.extname(strippedPath);
  const parts = strippedPath.replace(ext, "").split("/");
  const lang = parts.shift()! || SITE.defaultLanguage;
  const slug = parts.join("/") || "/";
  return { lang, slug };
}

export function getTextLocalized(item: { text: LText }, lang: string): string {
  if (lang in item.text) {
    return item.text[lang as "en" | "ru"]!;
  }
  return item.text.en;
}

export function createLink(item: { text: LText; link: string }, lang: string): string {
  if (item.link.startsWith("/")) {
    return `/${lang}${item.link}`;
  }
  return item.link;
}

export function createChangeLangLinks({ slug }: { slug: string }) {
  return Object.entries(KNOWN_LANGUAGES).map(([name, code]) => ({
    text: { en: name },
    link: slug === "/" ? `/${code}` : `/${code}/${slug}`,
  }));
}

export const translations = {
  docs: { text: { en: "Docs", ru: "Меню" } },
  Documentation: { text: { en: "Documentation", ru: "Документация" } },
  ThisPageIsNotTranslatedYet: {
    text: {
      en: "This page is not translated yet",
      ru: "Этот страница еще не переведена",
    },
  },
  PleaseOpenPRWithTranslations: {
    text: {
      en: "To add new translation open Pull Request",
      ru: "Чтобы добавить перевод, откройте Pull Request",
    },
  },
  usingThisLink: {
    text: {
      en: "using this link",
      ru: "по этой ссылке",
    },
  },
  ShowingContentForDefaultLanguage: {
    text: {
      en: "Showing content for default language",
      ru: "Отображается содержимое для языка по умолчанию",
    },
  },
  OnThisPage: {
    text: {
      en: "On this page",
      ru: "Оглавление",
    },
  },
  EditThisPage: {
    text: {
      en: "Edit this page",
      ru: "Внести правки",
    },
  },
  JoinOurCommunity: {
    text: {
      en: "Join our community",
      ru: "Войти в чат",
    },
  },
  More: {
    text: {
      en: "More",
      ru: "Дополнительно",
    },
  },
};
