workflow "New workflow" {
  on = "push"
  resolves = ["./docusaurus/"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "./docusaurus/" {
  uses = "./docusaurus/"
  secrets = ["GITHUB_TOKEN"]
  needs = ["Master"]
}
