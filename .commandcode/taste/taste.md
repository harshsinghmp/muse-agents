# Taste

- Wants conservative git operations: no force-push, no blind `git add -A` — stage explicit paths instead — and no rewriting published history (rewriting *unpushed* local commits is acceptable when explicitly asked). Confidence: 0.75
- Commit identity should use the GitHub noreply address (`harshsinghmp@users.noreply.github.com`) rather than a personal email — applied at the global git config level so all future projects default to it, not just one repo. Confidence: 0.9
- Expects failures to be surfaced, not silenced: fix failures introduced by the work, but report pre-existing ones with evidence rather than suppressing or hiding them. Confidence: 0.65
