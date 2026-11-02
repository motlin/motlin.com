# `just --list --unsorted`
[group('default')]
default:
    @just --list --unsorted

ci := env("CI", "")

export PATH := justfile_directory() / "node_modules/.bin" + ":" + env("PATH")

# Install dependencies
[group('setup')]
install:
    pnpm install
    oxfmt-next-line --no-error-on-unmatched-pattern CLAUDE.md

# Download GitHub data to .github-cache/ (requires 1Password locally, GITHUB_TOKEN in CI)
download-data: install
    {{ if ci != "" { "" } else { "op run --" } }} pnpm run download-github-data

# Run dev server
dev *args: install
    pnpm start --port 4000 --host 0.0.0.0 {{ args }}

# `pnpm start`
start: install
    pnpm start --port 4000 --host 0.0.0.0

# Start with drafts enabled: `DOCUSAURUS_DRAFT=true pnpm start`
start-drafts: install
    bash -c 'DOCUSAURUS_DRAFT=true pnpm start --port 4000 --host 0.0.0.0'

# `pnpm run serve`
serve: build
    pnpm run serve --port 4000

# `pnpm run deploy`
deploy: install
    pnpm run deploy

# `pnpm run clear`
clear: install
    pnpm run clear

# `git submodule update --init --recursive`
update-submodules:
    git submodule update --init --recursive

# Run linter
lint: install
    vp lint {{ if ci != "" { "--format github" } else { "--fix" } }}

# Run formatter
format: install
    pre-commit run just-fmt --all-files
    oxfmt-next-line {{ if ci != "" { "--check" } else { "" } }}

# Run checks (lint + typecheck; formatting is `just format`)
check *args: install
    vp run --cache check {{ if ci != "" { "" } else { "--fix" } }} {{ args }}

# Run tests
test *args: install
    vp run --cache test:run {{ args }}

# Type-check the project
typecheck: install
    vp run typecheck

# Build the project
build: install
    vp run --cache build

# Apply safe Fallow fixes locally, then reject remaining dead code
fallow: install
    {{ if ci == "" { "vp run fallow" } else { "true" } }}
    vp run fallow:ci

# vp run fallow:ci
fallow-check: install
    vp run fallow:ci

# Run Storybook
storybook *args: install
    vp run storybook {{ args }}

# `pnpm run build-storybook`
build-storybook: install
    pnpm run build-storybook

# Run pre-commit hooks on all files (same as CI's pre-commit job)
pre-commit: install
    pre-commit run --all-files

# Run all pre-commit checks
[arg("quick", long, value="true", help="Skip tests")]
verify quick="": update-submodules check build fallow pre-commit
    {{ if quick != "true" { "just test" } else { "true" } }}
    @echo "All pre-commit checks passed!"

# Deprecated alias for `verify`
[arg("quick", long, value="true", help="Skip tests")]
precommit quick="": (verify quick)
