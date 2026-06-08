# Contributing to Focus ASTU CP Hub

Thank you for your interest in contributing! This guide covers everything you need to get started — from picking an issue to getting your pull request merged.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [The Contribution Workflow](#the-contribution-workflow)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Code Standards](#code-standards)
- [Pull Request Guidelines](#pull-request-guidelines)
- [PR Size and Stacked PRs](#pr-size-and-stacked-prs)
- [Review Process](#review-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Ways to Contribute

- **Fix a bug** — pick any open issue labeled `bug` or `good first issue`
- **Build a feature** — pick an issue labeled `enhancement` or `help wanted`
- **Write or improve tests** — look for issues labeled `testing`
- **Improve documentation** — fixes to `docs/`, `README.md`, or inline code comments
- **Report a bug** — open an issue using the appropriate template
- **Test the platform** — manually test features and report what you find

---

## Before You Start

1. Check the [open issues](../../issues) to see if your bug or idea is already tracked.
2. If you plan to work on something, **comment on the issue** to let us know — this prevents duplicate effort.
3. For large changes, open an issue first and discuss the approach before writing code.
4. Read through the [README](README.md) and [documentation](https://ayanasamuel8.github.io/focus-astu-cp-hub-web) to understand the project.

---

## Development Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Go | ≥ 1.22 |
| Node.js | ≥ 18 |
| PostgreSQL | ≥ 15 (or a Supabase project) |
| Chrome / Edge | For the extension |

### 1. Fork and clone

```bash
# Fork via GitHub UI, then:
git clone https://github.com/<your-username>/focus-astu-cp-hub-web.git
cd focus-astu-cp-hub-web

# Add the upstream remote so you can pull in future changes
git remote add upstream https://github.com/ayanasamuel8/focus-astu-cp-hub-web.git
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Fill in DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, SITE_URL

# Run migrations
psql "$DATABASE_URL" -f migrations/001_initial.sql
psql "$DATABASE_URL" -f migrations/002_reconcile_problem_counts.sql
psql "$DATABASE_URL" -f migrations/003_editorial_votes.sql

go run ./cmd/server
# → http://localhost:8080
# → Swagger UI: http://localhost:8080/api/docs
```

### 3. Set up the frontend

```bash
cd frontend
cp .env.example .env
# Fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_BASE_URL

npm install
npm run dev
# → http://localhost:5173
```

### 4. Load the extension (optional)

1. Open `chrome://extensions`, enable **Developer mode**
2. Click **Load unpacked** → select the `extension/` folder
3. Generate an API key from **Settings** in the web portal and paste it into the extension popup

---

## The Contribution Workflow

```
upstream main
     │
     ▼
your fork/main   ──── pull updates ────►  your fork/main
                                                │
                                        create feature branch
                                                │
                                        make your changes
                                                │
                                        push to your fork
                                                │
                                        open pull request
                                                │
                                        team reviews & approves
                                                │
                                        merged into upstream main
```

### Step-by-step

**1. Keep your fork up to date**

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

**2. Create a feature branch**

```bash
git checkout -b fix/description-of-fix
# or
git checkout -b feat/description-of-feature
```

**3. Make your changes**

Write your code, follow the [code standards](#code-standards) below.

**4. Test your changes**

```bash
# Backend
cd backend && go build ./... && go vet ./...

# Frontend
cd frontend && npm run build && npm run lint
```

**5. Commit your changes**

```bash
git add <specific files>
git commit -m "fix: clear description of what changed"
```

**6. Push to your fork**

```bash
git push origin fix/description-of-fix
```

**7. Open a pull request**

- Go to your fork on GitHub and click **Compare & pull request**
- Fill in the PR template completely
- Link the issue it resolves using `Closes #<issue-number>`
- Request review if you know who to tag, otherwise the team will self-assign

---

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Bug fix | `fix/<short-description>` | `fix/contest-sync-crash` |
| New feature | `feat/<short-description>` | `feat/problem-search-filters` |
| Documentation | `docs/<short-description>` | `docs/extension-setup` |
| Refactor | `refactor/<short-description>` | `refactor/auth-middleware` |
| Tests | `test/<short-description>` | `test/submission-handler` |

---

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short summary in present tense>
```

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding or fixing tests |
| `chore` | Build scripts, dependency updates |

Examples:
```
feat: add pagination to problem library
fix: handle missing CF handle in contest sync
docs: add extension setup screenshots
```

---

## Code Standards

### Backend (Go)

- Follow standard Go formatting — run `gofmt -w .` before committing
- Run `go vet ./...` and fix any warnings
- Keep handlers thin; business logic belongs in the `usecase/` layer
- New endpoints must have a corresponding entry in `api/openapi.yaml`
- Do not commit `.env` files or secrets

### Frontend (React / TypeScript)

- Run `npm run lint` and fix all errors before opening a PR
- Use TypeScript — avoid `any` unless there is no alternative
- Reuse existing components from `src/components/` before creating new ones
- Keep API calls inside `src/lib/` or feature-specific hooks
- Do not commit `node_modules/` or `.env` files

### General

- **One logical change per PR** — if a PR touches unrelated things, split it
- Do not add comments that restate what the code does; only comment the *why* when it is non-obvious
- Keep PRs small — a reviewer should be able to fully understand a PR in one sitting (aim for under ~400 lines changed; see [PR size](#pr-size-and-stacked-prs) below)

---

## Pull Request Guidelines

- Fill in **every section** of the PR template
- Link the issue being resolved: `Closes #<number>`
- Include screenshots or screen recordings for UI changes
- Mark the PR as **Draft** if it is not ready for review
- Do not force-push after a review has started — add new commits instead
- Keep the PR branch up to date with `main` before requesting a final review

---

## PR Size and Stacked PRs

Small, focused PRs get reviewed faster, get better feedback, and are easier to revert if something goes wrong. We take this seriously.

### The rules

| Situation | What to do |
|-----------|-----------|
| One logical change, small diff | Single PR into `main` |
| One logical change, large diff | Split into a stack (see below) |
| Multiple logical changes | One PR per change — stacked if they depend on each other, independent if they don't |

> **Rough size guide:** under ~400 lines changed is easy to review. 400–800 lines is acceptable if it cannot be split. Over 800 lines — split it, no exceptions.

### What counts as "one logical change"

A logical change is a single, coherent reason to update the code. Examples of things that should be **separate PRs**:

- Adding a migration vs. adding the backend handler vs. adding the frontend UI (for a new feature, split across at least two PRs: backend first, then frontend)
- A refactor and a bug fix in the same area — even if they touch the same file
- Two independent features that happen to be worked on together

### Stacked PRs

When one change depends on another (e.g. the frontend needs the backend to land first), use a **stack**:

```
main
 └── feat/username-backend        ← PR 1: migration + API endpoints
      └── feat/username-frontend  ← PR 2: UI, targets PR 1's branch (not main)
           └── feat/username-url  ← PR 3: route changes, targets PR 2's branch
```

**How to create a stack:**

```bash
# Start from main
git checkout main && git pull upstream main

# First layer
git checkout -b feat/username-backend
# ... make changes ...
git push origin feat/username-backend
# Open PR: feat/username-backend → main

# Second layer — branch off the first, not main
git checkout -b feat/username-frontend feat/username-backend
# ... make changes ...
git push origin feat/username-frontend
# Open PR: feat/username-frontend → feat/username-backend
# Title it "[2/3] feat: username frontend"
```

**Updating a stack after review feedback:**

```bash
# Fix PR 1 (feat/username-backend), then rebase PR 2 onto it
git checkout feat/username-frontend
git rebase feat/username-backend
git push --force-with-lease origin feat/username-frontend
# Repeat for deeper layers
```

**When the base PR merges into main**, update the next PR's base in the GitHub UI from the merged branch to `main`, then rebase locally:

```bash
git checkout feat/username-frontend
git rebase main
git push --force-with-lease origin feat/username-frontend
```

### PR title format for stacks

Prefix with the position so reviewers can see the order at a glance:

```
[1/3] feat: username — database migration and API endpoints
[2/3] feat: username — frontend onboarding and settings UI
[3/3] feat: username — profile URL migration and redirects
```

### What if I am not sure whether to split?

If you are asking yourself whether to split, split. A PR that turns out to be too small costs nothing. A PR that is too large delays everyone.

---

## Review Process

Every pull request is reviewed by at least one team member before it is merged. Here is what to expect:

1. **Automated checks** run first (lint, build). These must pass.
2. A team member will review the code within a few days and leave comments or approve.
3. Address all requested changes by pushing additional commits — do not resolve review comments without making the change.
4. Once approved, a team member will merge the PR. **Contributors do not merge their own PRs.**
5. If a PR has no activity for two weeks after review comments are posted, it may be closed. You can always re-open it.

---

## Reporting Bugs

Use the GitHub issue templates — there are separate templates for:

- [Frontend bug](.github/ISSUE_TEMPLATE/frontend-bug.yml)
- [Backend bug](.github/ISSUE_TEMPLATE/backend-bug.yml)  
- [Extension bug](.github/ISSUE_TEMPLATE/extension-bug.yml)

Include steps to reproduce, expected vs. actual behavior, and screenshots where relevant. Check the [testing guide](https://ayanasamuel8.github.io/focus-astu-cp-hub-web/testing/) for how to set up a test account.

---

## Requesting Features

Open an issue using the [feature request](.github/ISSUE_TEMPLATE/feature-request.yml) template. Describe the problem you are trying to solve — not just the solution — and we will discuss it as a team before work begins.

---

## Questions?

Open a [GitHub Discussion](../../discussions) or comment on the relevant issue. We are happy to help.
