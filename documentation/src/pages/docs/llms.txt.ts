import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const docs = await getCollection("docs");

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(
    `# Effector.dev Documentation\n\n${docs
      .map((doc) => {
        return `- [${doc.data.title}](https://effector.dev/${doc.slug}/)\n`;
      })
      .join("")}`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
