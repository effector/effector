action "Master (disabled)" {
  uses = "actions/bin/filter@master"
  args = "branch workflow"
}

action "Docusaurus" {
  uses = "./.github/docusaurus"
  secrets = [
    "GITHUB_TOKEN",
    "NOW_TOKEN",
  ]
  needs = ["Master (disabled)"]
}
