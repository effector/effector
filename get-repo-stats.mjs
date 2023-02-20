import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const name = { owner: "effector", repo: "effector" };

const repo = await octokit.repos.get(name);

console.log(repo.data.stargazers_count, "stars");
console.log(repo.data.forks_count, "forks");
console.log(repo.data.open_issues_count, "open issues");
console.log(repo.data.license.spdx_id, "License");

const contribs = await octokit.paginate(octokit.repos.listContributors, { ...name, per_page: 100 });
console.log(contribs.length, "contributors");

const releases = await octokit.paginate(octokit.repos.listReleases, { ...name, per_page: 100 });
console.log(releases.length, "github releases");
