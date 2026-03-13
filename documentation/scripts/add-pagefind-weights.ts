/**
 * Adds or updates pagefindWeight in frontmatter of all docs .mdx files
 * based on path (nesting and section type). Run from repo root:
 *   pnpm exec tsx scripts/add-pagefind-weights.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import path from "path";

const DOCS_DIR = path.join(import.meta.dirname, "..", "src", "content", "docs");

function getWeightForSlug(slug: string): number {
  // API effector index (overview page)
  if (slug === "api/effector/index") return 6;
  // API effector module subdir
  if (slug.includes("api/effector/module/")) return 7;
  // API effector: leaf method/type pages (canonical for search) — highest
  if (/^api\/effector\/[^/]+$/.test(slug)) return 8;
  // API packages (effector-react, -solid, -vue) — hooks/API refs
  if (/^api\/effector-(react|solid|vue)(\/|$)/.test(slug)) return 7;
  // Top-level API index
  if (slug === "api/index" || slug.endsWith("/api/index")) return 5;
  // Essentials, guides, explanation (core concepts)
  if (slug.startsWith("essentials/") || slug.startsWith("guides/")) return 5;
  if (slug.startsWith("explanation/")) return slug.includes("glossary") ? 6 : 5;
  // Introduction, resources, advanced, ecosystem
  if (
    slug.startsWith("introduction/") ||
    slug.startsWith("resources/") ||
    slug.startsWith("advanced/") ||
    slug.startsWith("ecosystem-development/")
  )
    return 4;
  // TypeScript
  if (slug.startsWith("typescript/")) return 5;
  // Recipes (how-tos, less often searched by exact name)
  if (slug.startsWith("recipes/")) return 3;
  // FAQ
  if (slug === "FAQ" || slug.endsWith("/FAQ")) return 4;
  return 4;
}

function processFile(filePath: string) {
  const rel = path.relative(DOCS_DIR, filePath);
  const slug = rel.replace(/\.mdx?$/, "").replace(/^[a-z]{2}\//, ""); // en/api/effector/sample.mdx -> api/effector/sample
  const weight = getWeightForSlug(slug);

  let content = readFileSync(filePath, "utf-8");
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return;

  const [, frontmatterBody] = frontmatterMatch;
  const hasWeight = /^pagefindWeight:\s*\d+/m.test(frontmatterBody);
  let newFrontmatter: string;
  if (hasWeight) {
    newFrontmatter = frontmatterBody.replace(
      /^pagefindWeight:\s*\d+$/m,
      `pagefindWeight: ${weight}`,
    );
  } else {
    newFrontmatter = frontmatterBody.trimEnd() + "\npagefindWeight: " + weight + "\n";
  }

  const newContent = content.replace(
    /^---\r?\n[\s\S]*?\r?\n---/,
    "---\n" + newFrontmatter.trimEnd() + "\n---",
  );
  if (newContent !== content) {
    writeFileSync(filePath, newContent);
    console.log(rel, "->", weight);
  }
}

const files = globSync("**/*.mdx", { cwd: DOCS_DIR, absolute: true });
files.forEach(processFile);
console.log("Done. Processed", files.length, "files.");
