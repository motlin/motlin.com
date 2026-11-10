---
name: pages-import
description: Put a web app on a motlin.com subdomain and list it on https://motlin.com/pages. The source can be a Claude artifact (claude.ai/artifact/... or claude.ai/public/artifacts/...), an existing Cloudflare Pages project (*.pages.dev), or a Cloudflare Worker. Use when the user wants to import, publish, or move a game or page to <name>.motlin.com, or add one to the /pages list.
---

# Pages Import

Gets a web app live at `https://<name>.motlin.com/` and listed on `/pages` and the portfolio. The work starts at a different point depending on the source:

- **Claude artifact:** fetch the source, create a repo, then deploy it. New projects are Workers with static assets, not Pages. Older imports stay on Pages.
- **Existing Cloudflare Pages project:** skip to the custom domain.
- **Existing Cloudflare Worker:** `wrangler deploy --domain <name>.motlin.com` creates the DNS record itself. Skip to the listing.

An artifact that uses `window.claude.use('db')` or `('user')` has a backend to replace. Port it to a Worker API backed by D1. Players have no Claude identity on the public site, so the usual replacement is a random per-device ID in localStorage plus server-side validation and rate limits, with one hook where Turnstile or Cloudflare Access can be added later. Export the existing rows with the `ArtifactData` tool (`action: "list"`).

Ask for `<name>` if the user hasn't given one. Elsewhere, look at an existing import before inventing anything. `~/projects/cublitz` (artifact origin, Pages) and `~/projects/neighbors` (Pages, with per-PR previews) are the references. Copy their justfile, `wrangler.toml`, and `.github/workflows/deploy.yml` instead of writing new ones.

## Fetch the artifact source

Save the artifact HTML to a scratch file outside the new repo and port from it. Don't commit it, and don't add tests or checks that compare the app against it. Once ported, the app is the source of truth and its art and rules change freely.

- **The user's own artifact** (`claude.ai/artifact/<id>` or `claude.ai/code/artifact/<uuid>`): use the `Artifact` tool with `action: "read"`. The full HTML lands in a local file.
- **A public artifact** (`claude.ai/public/artifacts/<uuid>`): WebFetch only returns an empty SPA shell, and curl gets a Cloudflare challenge. Use Claude in Chrome on a claude.ai tab: run `fetch('/api/published_artifacts/<uuid>')` with `javascript_tool`, then POST the JSON to a throwaway local Node listener on a free port. The JSON's `content` field holds the HTML.

## Create the repo

Model the new repo on `~/projects/cublitz`: pnpm, Vite+, Vitest, Playwright, justfile, `wrangler.toml`, and GitHub Actions. Then, in this order:

- Every project is created from `~/projects/typescript-template` and syncs with it in both directions. Add the repo to the `own:` list in `~/projects/typescript-template/.llm/projects.yaml` and run its `/sync-template` command. The sync also registers `git test`.
- Run `git test run` on every commit and fix failures before deploying.
- Create the GitHub repo, asking the user whether it should be public or private:

```bash
env -u GITHUB_TOKEN gh repo create motlin/<name> --private --source . --remote origin
```

A hook blocks pushing to `main`, so the user pushes the first commit.

## Keep personal data out of the repo

Game repos are usually public. Artifact data often holds real names, such as high scores. Never commit them, not even in seed migrations or test fixtures. Tests use invented names like Alice and Bob. Load real rows once at go-live with `wrangler d1 execute <db> --remote --file <sql outside the repo>`. If a name was committed, rewrite history before the first push, for example by squashing into the root commit, then expire the reflog and gc.

## Deploy a Worker

`wrangler.toml` for a Worker with static assets and D1:

```toml
name = "<name>"
main = "src/worker/index.ts"
compatibility_date = "<recent>"
[assets]
directory = "dist"
binding = "ASSETS"
run_worker_first = ["/api/*"]
[[d1_databases]]
binding = "DB"
database_name = "<name>"
database_id = "<from d1 create>"
migrations_dir = "migrations"
```

Going live is a one-time sequence, in this order:

```bash
pnpm exec wrangler d1 create <name>          # put the printed id in database_id
pnpm exec wrangler d1 migrations apply <name> --remote
pnpm exec wrangler deploy --domain <name>.motlin.com
```

`--domain` goes in the deploy command, not in `wrangler.toml`, so previews don't claim the domain. CI deploys with the Workers deploy token as the `CLOUDFLARE_API_TOKEN` secret. A Worker needs no CNAME step.

## Create the Pages project and deploy

`wrangler.toml` for a Pages project is only:

```toml
name = "<project>"
compatibility_date = "2025-01-12"
pages_build_output_dir = "dist"
```

`*.pages.dev` names are global, and Cloudflare silently gives a taken name a random suffix (`neighbors-v3a.pages.dev`). A project can't be renamed, only deleted and recreated. Before creating it, check the name is free: if `dig +short <project>.pages.dev` returns anything, it's taken. Use `<name>-game` or similar in that case. The subdomain can still be `<name>.motlin.com`.

Create the project before the first deploy, or CI fails with `Project not found`:

```bash
pnpm exec wrangler pages project create <project> --production-branch main --force
pnpm run build && pnpm exec wrangler pages deploy --branch main --force
```

Recent wrangler needs `--force` for classic Pages. Without it, wrangler tries a Worker deploy and fails with `Missing entry-point to Worker script`. The permission classifier may block Claude from running these, in which case give the user the commands.

Set the CI secrets that `deploy.yml` reads. Get the account ID from `pnpm exec wrangler whoami`:

```bash
op read 'op://Development/Cloudflare API token - cmotlin - GitHub Actions Deploy - Cloudflare Pages/credential' | env -u GITHUB_TOKEN gh secret set CLOUDFLARE_API_TOKEN -R motlin/<name>
env -u GITHUB_TOKEN gh secret set CLOUDFLARE_ACCOUNT_ID -R motlin/<name> --body <account-id>
```

`deploy.yml` runs `node_modules/.bin/wrangler pages deploy --branch main` after `just install`. Don't use `cloudflare/wrangler-action`, whose `npm i wrangler@4` fails with `EUNSUPPORTEDPROTOCOL`.

## Attach the custom domain

Attaching the domain and adding the DNS record are two separate steps. The domain stays `initializing` until the record exists.

Attach the domain with the wrangler OAuth token:

```bash
T=$(pnpm exec wrangler auth token | tail -1)
curl -s -X POST -H "Authorization: Bearer $T" -H 'Content-Type: application/json' \
  -d '{"name":"<name>.motlin.com"}' \
  "https://api.cloudflare.com/client/v4/accounts/<account-id>/pages/projects/<project>/domains"
```

Then add a proxied CNAME, `<name>` → `<project>.pages.dev`. Only the Workers deploy token has DNS edit on motlin.com. The wrangler OAuth token and the Pages deploy token fail with `code 10000 Authentication error`. Look the zone ID up with `GET /zones?name=motlin.com`, check no `<name>` record exists, then create it:

```bash
T=$(op read 'op://Development/Cloudflare API token - cmotlin - GitHub Actions Deploy - Edit Cloudflare Workers/credential')
curl -s -H "Authorization: Bearer $T" "https://api.cloudflare.com/client/v4/zones/<zone-id>/dns_records?name=<name>.motlin.com"
curl -s -X POST -H "Authorization: Bearer $T" -H 'Content-Type: application/json' \
  -d '{"type":"CNAME","name":"<name>","content":"<project>.pages.dev","proxied":true}' \
  "https://api.cloudflare.com/client/v4/zones/<zone-id>/dns_records"
```

1Password item names drift. If `op read` can't find the item, list candidates with `op item list --vault Development` and filter for Cloudflare. To find which token has DNS edit without changing anything, PATCH a made-up record ID such as 32 zeros: `81044 Record does not exist` means it has write access, and `10000 Authentication error` means it doesn't.

Verify with `curl -sI https://<name>.motlin.com/`. A 522 just after adding the record is transient. If the name still doesn't resolve locally, negative DNS caching is the likely cause, so check against Cloudflare's nameserver with `dig @<ns>.ns.cloudflare.com <name>.motlin.com`.

Finally, set the GitHub repo's homepage with `gh repo edit motlin/<name> --homepage https://<name>.motlin.com`, and set the production environment `url` in `deploy.yml` if it has one.

## List it on motlin.com

Work in a worktree off `origin/main` (the `git:worktree` skill). Run `git submodule update --init --recursive` in it, or fallow fails with unresolved `!!raw-loader!` imports. Change three files, copying the neighboring games' entries:

- `static/img/<name>-favicon.svg`: the app's own SVG icon.
- `src/pages/pages.tsx`: a card after the other games, with `title`, a one-line `description`, `link: "https://<name>.motlin.com/"` and `iconUrl: "/img/<name>-favicon.svg"`.
- `src/data/portfolio.json`: an entry after the other games, with `id`, `name`, `repoUrl`, `description`, `links` (GitHub and Play), `techStack`, `features`, `githubRepo`, `iconUrl` and `language`. Leave out the GitHub link and `repoUrl` if the repo is private.

Commit as `Add <Name> to the pages index and the personal projects list with a link to play.`, run the `build:precommit` skill, and push the branch. Open a PR only if the user asks.

## Pitfalls

- `HTTP 401: Bad credentials` from `gh` means the `GITHUB_TOKEN` in the environment is stale. Prefix the command with `env -u GITHUB_TOKEN` so the keyring login is used.
- `curl: (7) Failed to connect to api.cloudflare.com` comes from the sandbox or the firewall. Give the user the command to run.
- Pass `--repo` to `gh run` commands. Without it they can hit the wrong repository.
