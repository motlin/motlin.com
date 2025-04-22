# `just --list --unsorted`
default:
    @just --list --unsorted

# Push to origin with force-with-lease
push:
    git push --force-with-lease origin drafts:drafts main:main

# Build the static site using Retype
retype-build:
    npx retypeapp build

# Build, start local server and watch for changes
retype-serve:
    npx retypeapp start
