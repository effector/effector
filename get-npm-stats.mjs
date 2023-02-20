import * as childProcess from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(childProcess.exec);

async function getGzipSize(packageName) {
  const response = await fetch(`https://bundlephobia.com/api/size?package=${packageName}@latest&record=true`, {
    headers: {
      accept: "application/json",
      "accept-language": "en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6",
      "x-bundlephobia-user": "bundlephobia website",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  });

  const { gzip } = await response.json();
  if (!gzip) return null;
  return gzip / 1024;
}

// Links to web:
// - https://bundlejs.com/?q=effector&treeshake=[*]
// - https://bundlephobia.com/package/effector@latest

// // PACKAGE HISTORY SIZE
// fetch("https://bundlephobia.com/api/package-history?package={PACKAGE_NAME}@latest&limit=500", {
//   headers: {
//     accept: "application/json",
//     "accept-language": "en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6",
//     "x-bundlephobia-user": "bundlephobia website",
//   },
//   referrerPolicy: "strict-origin-when-cross-origin",
//   body: null,
//   method: "GET",
//   mode: "cors",
//   credentials: "omit",
// });

const packages = ["effector", "effector-react", "effector-solid", "effector-vue", "patronum", "@effector/reflect"];

const minWidth = packages.reduce((a, b) => Math.max(a, b.length), 0);

const results = await Promise.all(
  packages.map(
    async (packageName) =>
      `${packageName.padEnd(minWidth + 4, " ")}${await (await getGzipSize(packageName)).toFixed(1)} kB gzipped`
  )
);

console.log(results.join("\n"));

const result = await exec("npm info effector --json");
const npm = JSON.parse(result.stdout);

const latestVersion = npm["dist-tags"].latest;
const latestVersionReleaseDate = npm.time[latestVersion];
const totalNpmReleases = npm.versions.length;

console.log(" ");
console.log(
  "Latest version".padEnd(minWidth + 3, " "),
  latestVersion,
  "at",
  new Date(latestVersionReleaseDate).toLocaleDateString("ru-RU")
);
console.log("Total NPM Releases".padEnd(minWidth + 3, " "), totalNpmReleases);
