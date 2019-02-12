#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
function main(){
  docker run -d --name "${1}" -p 3000:3000 technologiestiftung/bzr:latest
}
main $1
