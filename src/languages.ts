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

export const translations = {
  docs: { text: { en: "Docs", ru: "Меню" } },
  Documentation: { text: { en: "Documentation", ru: "Документация" } },
};
