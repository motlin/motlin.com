# `just --list --unsorted`
default:
    @just --list --unsorted

# `npm install`
install:
    npm install

# `npm start`
start: install
    npm start -- --port 4000

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true npm start`
start-drafts: install
    DOCUSAURUS_DRAFT=true npm start -- --port 4000

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

# Run pre-commit workflow with fixes
precommit: lint-fix typecheck build
