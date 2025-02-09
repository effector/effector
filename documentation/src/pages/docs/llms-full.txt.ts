import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const docs = await getCollection("docs");

export const GET: APIRoute = async ({}) => {
  return new Response(
    `# Effector.dev Full Documentation\n\n${docs
      .map((doc) => {
        return `# ${doc.data.title}\n\n${doc.body}\n\n`;
      })
      .join("")}`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
