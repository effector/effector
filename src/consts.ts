export const SITE = {
  title: "effector",
  description: "Business logic with ease.",
  defaultLanguage: "en",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "/banner.png",
    alt: "effector logo is a comet moving away",
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

// It is useful when documentation package located in a subdirectory
// There would be 'beta/'. Slash at the end is required
export const GITHUB_DOCS_ROOT = "";

// Used to convert pathname into file path in the repository
export const GITHUB_DOCS_FILE_PREFIX = "src/content/docs/";

export const GITHUB_EDIT_URL = `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}`;

export const LINKS = {
  github: "https://github.com/effector/effector",
  discord: "https://discord.gg/yHcMcuRWeC",
  twitter: "https://twitter.com/effectorjs",
  blog: "https://patreon.com/zero_bias",
  repl: "https://share.effector.dev",
  changelog: "https://changelog.effector.dev",
};

export const COMMUNITY_INVITE_URL = LINKS.discord;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};
