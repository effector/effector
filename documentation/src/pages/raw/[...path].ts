// src/pages/raw/[...path].ts
import fs from "node:fs/promises";
import path from "node:path";
import { getCollection } from "astro:content";

const CONTENT_ROOT = path.resolve("src/content/docs");

export async function getStaticPaths() {
  const entries = await getCollection("docs");
  return entries.map((e) => {
    // e.id: 'ru/essentials/manage-states.mdx'
    const noExt = e.id.replace(/\.mdx?$/i, ""); // 'ru/essentials/manage-states'
    return { params: { path: noExt.split("/") } }; // важно: массив!
  });
}

export async function GET({ params, url }: { params: any; url: URL }) {
  const parts: string[] = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);

  const rel = parts.join("/");
  const base = path.resolve(CONTENT_ROOT, rel);
  const candidates = [base, base + ".mdx", base + ".md"];

  let filePath: string | null = null;
  for (const p of candidates) {
    try {
      await fs.access(p);
      filePath = p;
      break;
    } catch {}
  }
  if (!filePath) return new Response("Not found", { status: 404 });

  let raw = await fs.readFile(filePath, "utf8");
  if (url.searchParams.get("stripFrontmatter") === "1") {
    raw = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");
  }
  if (url.searchParams.get("removeImports") === "1") {
    raw = raw.replace(/^\s*import\s.+?from\s.+?;?\s*$/gm, "");
  }

  return new Response(raw, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
