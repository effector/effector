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
  "O'zbekcha": "uz",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

// TODO: update this urls
export const GITHUB_REPO = "effector/effector";
export const GITHUB_BRANCH = "master";

// It is useful when documentation package located in a subdirectory
// There would be 'beta/'. Slash at the end is required
export const GITHUB_DOCS_ROOT = "documentation/";

// Used to convert pathname into file path in the repository
// It is where the docs are located related to the docs package.json file
export const GITHUB_DOCS_CONTENT_DIR = "src/content/docs/";

// @see https://developer.stackblitz.com/codeflow/integrating-web-publisher
// Format: https://pr.new/github.com/{repo-owner's-username}/{repo}/edit/{branch}/{file-path-in-the-repo}
// export const GITHUB_EDIT_URL = `https://pr.new/github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/`;
// If there will be function, we can add `initialPath` parameter

export const GITHUB_EDIT_URL = `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/`;
export const GITHUB_COMMITS_URL = `https://github.com/${GITHUB_REPO}/commits/${GITHUB_BRANCH}/`;

export const LINKS = {
  github: "https://github.com/effector/effector",
  discord: "https://discord.gg/yHcMcuRWeC",
  twitter: `https://twitter.com/${OPEN_GRAPH.twitter}`,
  blog: "https://patreon.com/zero_bias",
  repl: "https://share.effector.dev",
  changelog: "https://changelog.effector.dev",

  community: "https://community.effector.dev/",
  telegramRU: "https://t.me/effector_ru",
  telegramEN: "https://t.me/effector_en",
  devTo: "https://dev.to/effector",
  reddit: "https://www.reddit.com/r/effectorjs/",
  youtube: "https://youtube.com/@effectorjs",
  linesOfCode: "https://t.me/lines_of_code_diagrams",
};

export const COMMUNITY_INVITE_URL = LINKS.discord;

export const PAGE_NAVIGATION = {
  next: {
    text: { en: "Next", ru: "Следующая", uz: "Keyingi" },
  },
  previous: {
    text: { en: "Previous", ru: "Предыдущая", uz: "Oldingi" },
  },
} as const;
