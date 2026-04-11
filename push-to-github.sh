#!/usr/bin/env bash
# One-shot: clean up the broken .git directory, reinitialize, and push to
# github.com/SolarMason/SEMS on the main branch.
#
# Run from your Mac's Terminal:
#   cd "~/path/to/SEMS LLC/SEMS"
#   chmod +x push-to-github.sh
#   ./push-to-github.sh
#
# Requires: git, and a logged-in GitHub credential helper (gh auth login,
# or git's osxkeychain helper, or an SSH key configured for GitHub).

set -euo pipefail

REPO_URL="https://github.com/SolarMason/SEMS.git"
BRANCH="main"
COMMIT_MSG="Initial Next.js + Tailwind scaffold with static export

- Next.js 14 App Router with TypeScript and Tailwind CSS
- Marketing site: home, about, contact, and product pages for
  Avans Rac, Utilitas Trac, and TST Series
- Tools section embeds legacy Racking Configurator, Array Builder,
  and GeoBuilder HTML from public/legacy/
- output: 'export' for static HTML deployment
- GitHub Actions workflow auto-deploys to GitHub Pages on push to main"

echo "==> Working in: $(pwd)"

if [ -d .git ]; then
  echo "==> Removing existing .git directory"
  rm -rf .git
fi

echo "==> git init"
git init -b "$BRANCH"

echo "==> git add -A"
git add -A

echo "==> git commit"
git commit -m "$COMMIT_MSG"

echo "==> git remote add origin $REPO_URL"
git remote add origin "$REPO_URL"

echo "==> git push -u origin $BRANCH"
git push -u origin "$BRANCH"

echo ""
echo "Done. View the repo at: https://github.com/SolarMason/SEMS"
