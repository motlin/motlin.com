# `just --list --unsorted`
default:
    @just --list --unsorted

# `npm install`
install:
    npm install

# Download GitHub data (requires 1Password for GitHub token)
# Run this once to populate .github-cache/, then other commands work without 1Password
download-data: install
    op run -- npm run download-github-data

# `npm start` (using cached data)
start: install
    npm start -- --port 4000

# `npm start` with fresh data download (requires 1Password)
start-with-download: install
    op run -- npm run start:with-download -- --port 4000

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true npm start`
start-drafts: install
    bash -c 'DOCUSAURUS_DRAFT=true npm start -- --port 4000'

# `npm run build` (using cached data)
build: install
    npm run build

# `npm run build` with fresh data download (requires 1Password)
build-with-download: install
    op run -- npm run build:with-download

# `npm run serve`
serve: build
    npm run serve -- --port 4000

# `npm run deploy`
deploy: install
    npm run deploy

# `npm run typecheck`
typecheck: install
    npm run typecheck

# `npm run ci:eslint`
lint: install
    npm run ci:eslint

# `npm run lint:fix`
lint-fix: install
    npm run lint:fix

# `npm run clear`
clear: install
    npm run clear

# Update submodules
update-submodules:
    git submodule update --remote

# Run pre-commit workflow with fixes
precommit: update-submodules lint-fix typecheck build
