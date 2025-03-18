import { readFile } from "fs/promises";
import { glob } from "glob";
import { join, resolve } from "path";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

async function checkLinks() {
  const files = await glob("./src/content/docs/**/*.{md,mdx}");
  let total = 0;

  const links: { url: string; file: string }[] = [];

  for (const file of files) {
    const tree = unified()
      .use(remarkParse)
      .parse(await readFile(join("./", file), "utf-8"));

    visit(tree, (node) => {
      if (node.type === "link" && !node.url.startsWith("http")) {
        if (node.url.startsWith("../") || node.url.startsWith("./")) {
          links.push({ url: resolve(file.replace("src/content/docs", ""), "../", node.url), file });
          return;
        }

        links.push({ url: node.url, file });
      }
    });
  }

  for (const { url, file } of links) {
    const req = await fetch(`http://localhost:4321${url}`);

    if (
      (await req.text()).includes(
        '<h1><span class="statusCode">404: </span> <span class="statusMessage">Not found</span></h1>',
      )
    ) {
      console.error(`link "${url}" not found in file ${file}`);
      total++;
    }
  }

  console.log(`Total errors: ${total}`);
}

checkLinks();
