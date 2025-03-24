import { type CollectionEntry, getCollection } from "astro:content";
import { getPathParamsFromId } from "./languages";

type DocsEntry = CollectionEntry<"docs">;

export const translatedDocsIndex = await getTranslatedDocsIndex();

export async function getTranslatedDocsIndex() {
  // Slugs without lang prefix is required to generate all documents even not translated yet.
  const sourceSlugs = new Set<string>();
  // Slug WITH lang prefix per entry mapping, here the translated pages
  const docs: Record<string, DocsEntry> = {};

  const docsList = await getCollection("docs");

  docsList.forEach((doc) => {
    let { slug, lang } = getPathParamsFromId(doc.id);
    if (slug.endsWith("/index")) {
      slug = slug.replace(/\/index$/, "");
    }
    sourceSlugs.add(slug);

    docs[`${lang}/${slug}`] = doc;
  });

  return { docs, sourceSlugs };
}

export function getBreadcrumbs({
  path: originalPath,
  docs,
}: {
  path: string;
  docs: Record<string, DocsEntry>;
}) {
  const path = originalPath.replace(/\/$/, "").replace(/^\//, "");
  const breadcrumbs = [];

  let foundIndex = 0;
  while ((foundIndex = path.indexOf("/", foundIndex + 1)) !== -1) {
    const part = path.slice(0, foundIndex);
    breadcrumbs.push(part);
  }

  return breadcrumbs
    .filter((path) => docs[path])
    .map((path) => ({
      title: docs[path].data.title,
      path: `/${path}`,
    }));
}
