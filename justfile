# `just --list --unsorted`
default:
    @just --list --unsorted

# `pnpm install`
install:
    pnpm install

# `pnpm install --frozen-lockfile`
install-ci:
    pnpm install --frozen-lockfile

# Download GitHub data to .github-cache/ (requires 1Password)
download-data: install
    op run -- pnpm run download-github-data

# Download GitHub data to .github-cache/ (requires GITHUB_TOKEN)
download-data-ci: install-ci
    pnpm run download-github-data

# `pnpm start`
start: install
    pnpm start --port 4000 --host 0.0.0.0

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true pnpm start`
start-drafts: install
    bash -c 'DOCUSAURUS_DRAFT=true pnpm start --port 4000 --host 0.0.0.0'

# `pnpm run build`
build: install
    pnpm run build

# `pnpm run build`
build-ci: install-ci
    pnpm run build

# `pnpm run serve`
serve: build
    pnpm run serve --port 4000

# `pnpm run deploy`
deploy: install
    pnpm run deploy

# `pnpm run typecheck`
typecheck: install
    pnpm run typecheck

# `pnpm run typecheck`
typecheck-ci: install-ci
    pnpm run typecheck

# `pnpm run ci:eslint`
lint: install
    pnpm run ci:eslint

# `pnpm run ci:eslint`
lint-ci: install-ci
    pnpm run ci:eslint

# `pnpm run lint:fix`
lint-fix: install
    pnpm run lint:fix

# `pnpm run clear`
clear: install
    pnpm run clear

# `git submodule update --init --recursive`
update-submodules:
    git submodule update --init --recursive

# `pnpm run test`
test: install
    pnpm run test

# `pnpm run test:run`
test-run: install
    pnpm run test:run

# `pnpm run test:run`
test-run-ci: install-ci
    pnpm run test:run

# `pnpm run test:watch`
test-watch: install
    pnpm run test:watch

# `pnpm run test:ui`
test-ui: install
    pnpm run test:ui

# `pnpm run storybook`
storybook: install
    pnpm run storybook

# `pnpm run build-storybook`
build-storybook: install
    pnpm run build-storybook

validate-lockfile:
    @echo "Validating pnpm-lock.yaml is in sync..."
    @pnpm install --frozen-lockfile --lockfile-only --silent || (echo "Error: pnpm-lock.yaml is out of sync with package.json. Run 'pnpm install' and commit the changes." && exit 1)

# Run all pre-commit checks
precommit: update-submodules validate-lockfile lint-fix typecheck test-run build
