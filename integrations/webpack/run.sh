#!/bin/bash -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)"  # Figure out where the script is running

# Check to see that we have a required binary on the path
function require_binary {
  if [ -z "${1:-}" ]; then
    error "${FUNCNAME[0]} requires an argument"
    exit 1
  fi

  if ! [ -x "$(command -v "$1")" ]; then
    error "The required executable '$1' is not on the path."
    exit 1
  fi
}

require_binary docker

rm -rf "$SCRIPT_DIR/npm"
cp -rf "$SCRIPT_DIR/../../npm" "$SCRIPT_DIR/npm"

docker build -t effector/webpack "$SCRIPT_DIR" && \
docker run -p 8080:8080 -d effector/webpack:latest
