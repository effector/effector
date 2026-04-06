import type { APIRoute } from "astro";
import { execSync } from "node:child_process";
import { getCollection } from "astro:content";
import { SITE, KNOWN_LANGUAGE_CODES } from "../consts";
import { getPathParamsFromId } from "../languages";

const DEFAULT_SITE_URL = "http://localhost:4321";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

type SitemapEntry = {
  loc: string;
  lastmod?: string;
};

const buildSitemap = (entries: SitemapEntry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url><loc>${escapeXml(entry.loc)}</loc>${
        entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""
      }</url>`,
  )
  .join("\n")}
</urlset>
`;

const getGitLastModified = (filePath: string): string | undefined => {
  try {
    // Get the last commit date for this file
    const timestamp = execSync(`git log -1 --format=%ct "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();

    if (!timestamp) {
      return undefined;
    }

    // Convert Unix timestamp to ISO 8601 date (YYYY-MM-DD format for sitemap)
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toISOString().split("T")[0];
  } catch {
    return undefined;
  }
};

export const GET: APIRoute = async () => {
  const site = import.meta.env.SITE ?? DEFAULT_SITE_URL;
  const entries = new Map<string, SitemapEntry>();

  const landingPages = [
    { path: "/", filePath: "src/pages/index.astro" },
    ...KNOWN_LANGUAGE_CODES.filter((code) => code !== SITE.defaultLanguage).map((code) => ({
      path: `/${code}`,
      filePath: `src/pages/${code}.astro`,
    })),
  ];

  for (const page of landingPages) {
    const loc = new URL(page.path, site).toString();
    entries.set(loc, { loc, lastmod: getGitLastModified(page.filePath) });
  }

  const docs = await getCollection("docs");
  for (const doc of docs) {
    let { slug, lang } = getPathParamsFromId(doc.id);
    if (slug.endsWith("/index")) {
      slug = slug.replace(/\/index$/, "");
    }

    const path = slug === "/" ? `/${lang}` : `/${lang}/${slug}`;
    const loc = new URL(path, site).toString();
    const filePath = `src/content/docs/${doc.id}`;
    entries.set(loc, { loc, lastmod: getGitLastModified(filePath) });
  }

  const sitemap = buildSitemap(Array.from(entries.values()).sort((a, b) => a.loc.localeCompare(b.loc)));

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
