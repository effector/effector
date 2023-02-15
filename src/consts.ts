export const SITE = {
  title: "effector",
  description: "Your website description.",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," + " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "effectorjs",
};

export const KNOWN_LANGUAGES = {
  English: "en",
  Russian: "ru",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

// TODO: update this urls
export const GITHUB_REPO = "sergeysova/new-docs";
export const GITHUB_BRANCH = "main";
export const GITHUB_DOCS_ROOT = ""; // there would be 'beta/' slash at the end is required

export const GITHUB_EDIT_URL = `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/`;

export const COMMUNITY_INVITE_URL = `https://discord.gg/yHcMcuRWeC`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};
