#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

docker build -t technologiestiftung/bzr -f Dockerfile .
