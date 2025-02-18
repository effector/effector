import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { KNOWN_LANGUAGE_CODES } from "src/languages";
import { processMarkdown } from "src/llm-processor";

export async function getStaticPaths() {
  return Object.values(KNOWN_LANGUAGE_CODES).map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
  const originalDocs = await getCollection(
    "docs",
    (doc) => doc.slug.startsWith(`en/`) || doc.data.lang === "en",
  );

  // non localized slug -> astro doc entry
  const uniqueDocs = new Map(originalDocs.map((doc) => [doc.slug.replace("en/", ""), doc]));

  // Show original articles if no translation available
  if (params.lang !== "en") {
    const localizedDocs = await getCollection(
      "docs",
      // Some articles does not set lang frontmatter parameter
      (doc) => doc.slug.startsWith(`${params.lang}/`) || doc.data.lang === params.lang,
    );

    localizedDocs.forEach((doc) => {
      const nonLocalizedSlug = doc.slug.replace(`${params.lang}/`, "");
      // Just replace original article if translation available
      uniqueDocs.set(nonLocalizedSlug, doc);
    });
  }

  // Simplify markdown, to reduce tokens count (135K tokens to 114K)
  const processedDocs = await Promise.all(
    uniqueDocs.values().map(async (doc) => {
      const processedBody = await processMarkdown(doc.body);
      return `# ${doc.data.title}\n\n${processedBody}\n\n`;
    }),
  );

  const localeDocs = processedDocs.join("");

  return new Response(`Effector.dev Documentation\n---\n\n${localeDocs}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
