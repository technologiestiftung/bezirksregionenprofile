#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

docker kill "${1}" && docker rm "${1}"
