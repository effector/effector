import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";

interface Article {
  id: string;
  path: string;
  title: string;
  description: string;
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { title: string; description: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { title: "", description: "" };
  }

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
  const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    description: descriptionMatch ? descriptionMatch[1].trim() : "",
  };
}

// Recursively find all .mdx files
function findMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function listUniqueArticles() {
  const docsDir = join(process.cwd(), "src", "content", "docs");
  const allFiles = findMdxFiles(docsDir);

  // Sort files to ensure 'en' is processed first (prefer English descriptions)
  allFiles.sort((a, b) => {
    const aLang = relative(docsDir, a).split(sep)[0];
    const bLang = relative(docsDir, b).split(sep)[0];
    if (aLang === "en" && bLang !== "en") return -1;
    if (aLang !== "en" && bLang === "en") return 1;
    return a.localeCompare(b);
  });

  // Use a Map to store unique articles by their path (without language)
  const uniqueArticles = new Map<string, Article>();

  allFiles.forEach((filePath) => {
    // Get relative path from docs directory
    const relativePath = relative(docsDir, filePath);
    const parts = relativePath.split(sep);

    // First part is the language (en, ru, etc.)
    if (parts.length < 2) return;

    const lang = parts[0];
    // Remove language and .mdx extension to get the semantic ID
    let semanticPath = parts.slice(1).join("/").replace(/\.mdx$/, "");

    // Remove /index suffix if present
    if (semanticPath.endsWith("/index")) {
      semanticPath = semanticPath.replace(/\/index$/, "");
    }

    // Only add if we haven't seen this path before (now 'en' is processed first)
    if (!uniqueArticles.has(semanticPath)) {
      const content = readFileSync(filePath, "utf-8");
      const { title, description } = parseFrontmatter(content);

      if (title) {
        uniqueArticles.set(semanticPath, {
          id: semanticPath,
          path: semanticPath,
          title,
          description: description || "(No description available)",
        });
      }
    }
  });

  // Sort articles by path for consistent ordering
  const sortedArticles = Array.from(uniqueArticles.values()).sort((a, b) =>
    a.path.localeCompare(b.path)
  );

  // Output as plain list
  console.log("# Documentation Articles\n");
  console.log(`Total unique articles: ${sortedArticles.length}\n`);

  sortedArticles.forEach((article) => {
    console.log(`## ${article.title}`);
    console.log(`**Path:** ${article.path}`);
    console.log(`**ID:** ${article.id}`);
    console.log(`**Summary:** ${article.description}`);
    console.log();
  });
}

listUniqueArticles();
