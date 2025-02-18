import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { processMarkdown } from "src/llm-processor";

const docs = await getCollection("docs");

export const GET: APIRoute = async ({}) => {
  const processedDocs = await Promise.all(
    docs.map(async (doc) => {
      const processedBody = await processMarkdown(doc.body);
      return `# ${doc.data.title}\n\n${processedBody}\n\n`;
    }),
  );

  const joinedDocs = processedDocs.join("");

  return new Response(`Effector.dev Documentation\n---\n\n${joinedDocs}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
