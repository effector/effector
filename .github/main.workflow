workflow "New workflow" {
  on = "push"
  resolves = ["Docusaurus"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Docusaurus" {
  uses = "./.github/docusaurus"
  secrets = ["GITHUB_TOKEN"]
  needs = ["Master"]
}
