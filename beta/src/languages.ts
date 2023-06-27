import path from "node:path";
import { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES, SITE } from "./consts";

export { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES };

export type LText = {
  [Key in (typeof KNOWN_LANGUAGE_CODES)[number]]?: string;
} & { en: string };

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
      ru: "Эта страница еще не переведена",
    },
  },
  TranslationDisclaimer: {
    title: {
      text: {
        en: "",
        ru: "Перевод поддерживается сообществом",
      },
    },
    firstLine: {
      text: {
        en: "",
        ru: "Документация на английском языке - самая актуальная, поскольку её пишет и обновляет команда effector. Перевод документации на другие языки осуществляется сообществом по мере наличия сил и желания.",
      },
    },
    secondLine: {
      text: {
        en: "",
        ru: "Помните, что переведенные статьи могут быть неактуальными, поэтому для получения наиболее точной и актуальной информации рекомендуем использовать оригинальную англоязычную версию документации.",
      },
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
  Contributors: {
    text: {
      en: "Contributors",
      ru: "Соавторы",
    },
  },
  Pagefind: {
    placeholder: { text: { en: "Search", ru: "Поиск" } },
    clear_search: { text: { en: "Clear" } },
    load_more: { text: { en: "Load more results" } },
    search_label: { text: { en: "Search this site" } },
    filters_label: { text: { en: "Filters" } },
    zero_results: { text: { en: "No results for [SEARCH_TERM]" } },
    many_results: { text: { en: "[COUNT] results for [SEARCH_TERM]" } },
    one_result: { text: { en: "[COUNT] result for [SEARCH_TERM]" } },
    alt_search: {
      text: {
        en: "No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
      },
    },
    search_suggestion: {
      text: { en: "No results for [SEARCH_TERM]. Try one of the following searches:" },
    },
    searching: { text: { en: "Searching for [SEARCH_TERM]..." } },
  },
  Search: {
    label: { text: { en: "Search", ru: "Поиск" } },
    shortcutLabel: { text: { en: "(Press / to Search)", ru: "(Нажмите / для поиска)" } },
    cancelLabel: { text: { en: "Cancel", ru: "Отмена" } },
    devWarning: {
      text: {
        en: "Search is only available in production builds. \nTry building and previewing the site to test it out locally.",
        ru: "Поиск недоступен в сборке для разработки. \nСоберите и включите preview для проверки поиска локально.",
      },
    },
  },
};
