import { trimTrailingSlash } from "./trim-trailing-slash";

export function normalizeUrlPath(link: string) {
  const linkWithoutSlash = trimTrailingSlash(link);
  return linkWithoutSlash.startsWith("/") ? linkWithoutSlash : `/${linkWithoutSlash}`;
}
