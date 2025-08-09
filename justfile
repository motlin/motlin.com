# `just --list --unsorted`
default:
    @just --list --unsorted

# `npm install`
install:
    npm install

# Download GitHub data to .github-cache/ (requires 1Password)
download-data: install
    op run -- npm run download-github-data

# Download GitHub data to .github-cache/ (requires GITHUB_TOKEN)
download-data-ci: install
    npm run download-github-data

# `npm start`
start: install
    npm start -- --port 4000

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true npm start`
start-drafts: install
    bash -c 'DOCUSAURUS_DRAFT=true npm start -- --port 4000'

# `npm run build`
build: install
    npm run build

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

# `npm run test`
test: install
    npm run test

# `npm run test:run`
test-run: install
    npm run test:run

# `npm run test:watch`
test-watch: install
    npm run test:watch

# `npm run test:ui`
test-ui: install
    npm run test:ui

# `npm run storybook`
storybook: install
    npm run storybook

# `npm run build-storybook`
build-storybook: install
    npm run build-storybook

precommit: update-submodules lint-fix typecheck test-run build
