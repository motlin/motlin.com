# `just --list --unsorted`
default:
    @just --list --unsorted

# `npm start -- --port 4000`
start:
    npm start -- --port 4000

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true npm start -- --port 4000`
start-drafts:
    DOCUSAURUS_DRAFT=true npm start -- --port 4000

# `npm run build`
build:
    npm run build

# `npm run serve`
serve: build
    npm run serve -- --port 4000

# `npm run deploy`
deploy:
    npm run deploy

# `npm run typecheck`
typecheck:
    npm run typecheck

# `npm run ci:eslint`
lint:
    npm run ci:eslint

# `npm run lint:fix`
lint-fix:
    npm run lint:fix

# `npm run clear`
clear:
    npm run clear

# Run pre-commit workflow with fixes
precommit: lint-fix typecheck build
