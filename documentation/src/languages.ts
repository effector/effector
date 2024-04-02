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
    return item.text[lang as "en" | "ru" | "uz"]!;
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
      uz: "Bu sahifa hali tarjima qilinmagan",
    },
  },
  TranslationDisclaimer: {
    title: {
      text: {
        en: "",
        ru: "Перевод поддерживается сообществом",
        uz: "Tarjima jamiyat tomonidan qollanilyapti",
      },
    },
    firstLine: {
      text: {
        en: "",
        ru: "Документация на английском языке - самая актуальная, поскольку её пишет и обновляет команда effector. Перевод документации на другие языки осуществляется сообществом по мере наличия сил и желания.",
        uz: "Ingliz tilidagi hujjatlar eng dolzarb hisoblanadi, chunki u effector guruhi tomonidan yozilgan va yangilanadi. Hujjatlarni boshqa tillarga tarjima qilish jamiyat tomonidan kuch va istaklar mavjud bo'lganda amalga oshiriladi.",
      },
    },
    secondLine: {
      text: {
        en: "",
        ru: "Помните, что переведенные статьи могут быть неактуальными, поэтому для получения наиболее точной и актуальной информации рекомендуем использовать оригинальную англоязычную версию документации.",
        uz: "Esda tutingki, tarjima qilingan maqolalar yangilanmasligi mumkin, shuning uchun eng aniq va dolzarb ma'lumot uchun hujjatlarning asl inglizcha versiyasidan foydalanishni tavsiya etamiz.\n",
      },
    },
  },
  PleaseOpenPRWithTranslations: {
    text: {
      en: "To add new translation open Pull Request",
      ru: "Чтобы добавить перевод, откройте Pull Request",
      uz: "Tarjima qoshish uchun havola boyicha o'tib Pull Request oching",
    },
  },
  usingThisLink: {
    text: {
      en: "using this link",
      ru: "по этой ссылке",
      uz: "(havolaga o'tish)",
    },
  },
  ShowingContentForDefaultLanguage: {
    text: {
      en: "Showing content for default language",
      ru: "Отображается содержимое для языка по умолчанию",
      uz: "Standart til uchun tarkibni ko'rsatadi",
    },
  },
  OnThisPage: {
    text: {
      en: "On this page",
      ru: "Оглавление",
      uz: "Mundarija",
    },
  },
  EditThisPage: {
    text: {
      en: "Edit this page",
      ru: "Внести правки",
      uz: "O'zgartirish kiritish",
    },
  },
  JoinOurCommunity: {
    text: {
      en: "Join our community",
      ru: "Войти в чат",
      uz: "Chatga kirish",
    },
  },
  More: {
    text: {
      en: "More",
      ru: "Дополнительно",
      uz: "Qoshimcha",
    },
  },
  Contributors: {
    text: {
      en: "Contributors",
      ru: "Соавторы",
      uz: "Hammualliflar",
    },
  },
  Landing: {
    Stats: {
      title: { text: { en: "Effector at a Glance", ru: "effector в цифрах" } },
      size: { text: { en: "gzipped size", ru: "размер gzip", uz: "gzip hajmi" } },
      contributors: { text: { en: "contributors", ru: "соавторы", uz: "hammualliflar" } },
      stars: { text: { en: "stars", ru: "звёзды", uz: "yulduzchalar" } },
      downloads: { text: { en: "downloads", ru: "установки", uz: "yuklanmalar" } },
      latest: { text: { en: "latest version", ru: "актуальная версия", uz: "joriy versiya" } },
      license: { text: { en: "license", ru: "лицензия", uz: "litsenziya" } },
      StartByAddingEffectorAsDependency: {
        text: {
          en: "Start by adding effector as a dependency",
          ru: "Начните с установки effector",
          uz: "Effectorni ornatishdan boshlang",
        },
      },
    },
    Companies: {
      title: {
        text: {
          en: "Companies using effector",
          ru: "Компании использующие effector",
          uz: "Effektordan foydalanadigan kompaniyalar",
        },
      },
      wantToAppear: {
        text: {
          en: "Want to appear on this page?",
          ru: "Хотите попасть в этот список?",
          uz: "Ushbu ro'yxatga kirishni xohlaysizmi?",
        },
      },
      tellUs: {
        text: {
          en: "Tell us",
          ru: "Расскажите нам",
          uz: "Bizga habar bering",
        },
      },
    },
  },
  Pagefind: {
    placeholder: { text: { en: "Search", ru: "Поиск", uz: "Qidiruv" } },
    clear_search: { text: { en: "Clear", ru: "Очистить", uz: "Tozalash" } },
    load_more: {
      text: { en: "Load more results", ru: "Загрузить еще", uz: "Ko'proq natijalarni yuklash" },
    },
    search_label: {
      text: { en: "Search this site", ru: "Поиск по сайту", uz: "Sayt boyisha qidiruv" },
    },
    filters_label: { text: { en: "Filters", ru: "Фильтры", uz: "Filterlar" } },
    zero_results: {
      text: {
        en: "No results for [SEARCH_TERM]",
        ru: "Про [SEARCH_TERM] ничего не найдено",
        uz: "[SEARCH_TERM] bo‘yicha hech narsa yoq",
      },
    },
    many_results: {
      text: {
        en: "[COUNT] results for [SEARCH_TERM]",
        ru: "Найдено [COUNT] по поиску [SEARCH_TERM]",
        uz: "[SEARCH_TERM] uchun [COUNT] ta natija",
      },
    },
    one_result: {
      text: { en: "[COUNT] result for [SEARCH_TERM]", uz: "[SEARCH_TERM] uchun [COUNT] ta natija" },
    },
    alt_search: {
      text: {
        en: "No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
        uz: "[SEARCH_TERM] boʻyicha hech narsa topilmadi. Oʻrniga [DIFFERENT TERM] boyicha natijalar koʻrsatilmoqda",
      },
    },
    search_suggestion: {
      text: {
        en: "No results for [SEARCH_TERM]. Try one of the following searches:",
        uz: "[SEARCH_TERM] boʻyicha hech narsa topilmadi. Quyidagi qidiruvlardan birini sinab ko'ring:",
      },
    },
    searching: {
      text: {
        en: "Searching for [SEARCH_TERM]…",
        ru: "Поиск [SEARCH_TERM]…",
        uz: "[SEARCH_TERM] qidirilmoqda…",
      },
    },
  },
  Search: {
    label: { text: { en: "Search", ru: "Поиск", uz: "Qidiruv" } },
    shortcutLabel: {
      text: {
        en: "(Press / to Search)",
        ru: "(Нажмите / для поиска)",
        uz: "(Qidirish uchun / tugmasini bosing)",
      },
    },
    cancelLabel: { text: { en: "Cancel", ru: "Отмена", uz: "Bekor qilish" } },
    devWarning: {
      text: {
        en: "Search is only available in production builds. \nTry building and previewing the site to test it out locally.",
        ru: "Поиск недоступен в сборке для разработки. \nСоберите и включите preview для проверки поиска локально.",
        uz: "Qidiruv ishlanma tuzilmasida mavjud emas. \nLokal qidiruvingizni sinab ko'rish uchun preview ni bosib yoqing.",
      },
    },
  },
};
