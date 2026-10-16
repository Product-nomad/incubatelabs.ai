#!/usr/bin/env bash
# Monthly AI-answer check (root crontab: 0 7 1 * *, Europe/London). Runs as root so it can read the
# DataForSEO credentials in /root/.claude.json; git work is done as vpc in a dedicated clone, so the
# main working copy's branch doesn't matter. "[skip ci]" stops the commit triggering a deploy.
set -euo pipefail
CLONE=/home/vpc/.local/share/incubatelabs-aeo-tracking
REPO=https://github.com/Product-nomad/incubatelabs.ai.git
as_vpc() { sudo -u vpc -H "$@"; }

[ -d "$CLONE/.git" ] || as_vpc git clone -q "$REPO" "$CLONE"
as_vpc git -C "$CLONE" checkout -q main
as_vpc git -C "$CLONE" pull -q --ff-only

python3 -I "$CLONE/research/aeo-tracking/track.py"
chown -R vpc:vpc "$CLONE/research/aeo-tracking"

month=$(date +%Y-%m)
as_vpc git -C "$CLONE" add "research/aeo-tracking/$month.md" "research/aeo-tracking/$month.json"
if ! as_vpc git -C "$CLONE" diff --cached --quiet; then
  as_vpc git -C "$CLONE" commit -q -m "AI answer tracking: $month [skip ci]"
  as_vpc git -C "$CLONE" push -q origin main
fi
