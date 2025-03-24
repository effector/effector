export function normalizeUrlPath(link: string) {
  const linkWithoutSlash = trimTrailingSlash(link);
  return linkWithoutSlash.startsWith("/") ? linkWithoutSlash : `/${linkWithoutSlash}`;
}

export function trimTrailingSlash(link: string) {
  return link.endsWith("/") ? link.slice(0, -1) : link;
}
