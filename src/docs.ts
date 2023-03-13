import { CollectionEntry, getCollection } from "astro:content";
import { getPathParamsFromId } from "./languages";

export async function getTranslatedDocs() {
  // Slugs without lang prefix is required to generate all documents even translated yet.
  const sourceSlugs = new Set<string>();
  // Slug WITH lang prefix per entry mapping, here the translated pages
  const docs: Record<string, CollectionEntry<"docs">> = {};

  const docsList = await getCollection("docs");

  docsList.forEach((doc) => {
    let { slug, lang } = getPathParamsFromId(doc.id);
    if (slug.endsWith("/index")) {
      slug = slug.replace(/\/index$/, "");
    }
    sourceSlugs.add(slug);

    docs[`${lang}/${slug}`] = doc;
  });

  return { docs, sourceSlugs: Array.from(sourceSlugs) };
}
