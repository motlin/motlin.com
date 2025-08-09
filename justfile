# `just --list --unsorted`
default:
    @just --list --unsorted

# `npm install`
install:
    npm install

# `npm start`
start: install
    op run -- npm start -- --port 4000

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true npm start`
start-drafts: install
    op run -- bash -c 'DOCUSAURUS_DRAFT=true npm start -- --port 4000'

# `npm run build`
build: install
    op run -- npm run build

# `npm run serve`
serve: build
    op run -- npm run serve -- --port 4000

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

# Run pre-commit workflow with fixes
precommit: update-submodules lint-fix typecheck test-run build
