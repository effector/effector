FROM node:11.9.0-stretch

LABEL "maintainer"="goodmind <andwebar@gmail.com>"
LABEL "repository"="http://github.com/zerobias/effector"
LABEL "homepage"="http://github.com/zerobias/effector"

LABEL "com.github.actions.name"="Docusaurus Deploy"
LABEL "com.github.actions.description"="Deploy Docusaurus to Github Pages."
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="blue"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
