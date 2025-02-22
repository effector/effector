export function trimTrailingSlash(link: string) {
  return link.endsWith("/") ? link.slice(0, -1) : link;
}
