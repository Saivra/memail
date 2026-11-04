# Bulwark 1.20.0 compatibility review — 2026-11-05

## Decision

Fetched upstream and trial-merged release `1.20.0` at
`af32c846a2a4b684e21db1f05ce815ea08e26780` into the Memail preview in an
isolated worktree. It is **not a drop-in production update**. Do not deploy
this unresolved merge. This Memail preview retains Bulwark 1.19.1 while the
compatibility migration is prepared separately.

The reviewed release adds 197 commits, touching 412 files (33,151 additions,
1,355 deletions relative to the shared base). At review time upstream main
had 1,141 commits beyond our base and 1,788 changed files; importing all of
unreleased main would be a much broader migration. Prefer the released tag.

## Confirmed merge conflicts

| File | Required resolution |
| --- | --- |
| `components/email/rich-text-editor.tsx` | Retain Memail formatting/paste controls while integrating new editor behavior. |
| `components/files/file-details-panel.tsx` | Keep persistent actions, phone focus and scrolling while incorporating upstream metadata. |
| `components/files/files-header.tsx` | Preserve responsive path/navigation and new upstream controls. |
| `components/icons/index.ts` | Keep Heroicons and add adapters for newly introduced exports; avoid restoring the legacy host set. |
| `components/settings/settings-app.tsx` | Preserve search/navigation and review new sections, including proofreading. |
| `package.json`, `package-lock.json` | Retain Memail identity and product version, reconcile scripts, regenerate/verify the lockfile. |
| `vitest.config.ts` | Combine exclusions and preserve the separate node:test helper. |
| `CHANGELOG.md` | Keep downstream release history and append upstream history to its archive. |

An unresolved merge cannot build. These are actual merge conflicts, not proof
that a carefully reconciled 1.20.0 will fail at runtime.

## Additional compatibility gates

- Significant assistant/plugin host work spans mail batches, undo, calendar,
  Files and settings. Review permissions, account scoping, invocation and
  data projections. Do not install/enable providers or activate AI as part of
  this maintenance update; Memail's AI phase remains deferred.
- Reconcile proofreading settings and policy with that deferred AI phase.
- Review JMAP client/interface changes, shared/group account behavior,
  signature controls and offline/outbox interactions with real Stalwart.
- Dockerfile, LICENSE and NOTICE have no upstream changes in this release
  comparison. Preserve existing production volumes and credential directories.
- Update the upstream compatibility version separately from the Memail
  product version only after the merged tree is accepted. Run full unit,
  lint/types, build, core Stalwart integration, rich-paste/attachment round trips,
  Heroicons/RTL and browser acceptance on the resolved tree.

No runtime compatibility pass or production deployment of 1.20.0 is claimed.
The production update in this phase is the reviewed Memail UI/identity work,
not this upstream migration. Upstream commit ancestry remains available for
the future merge; no cherry-pick or rewrite was used to disguise the conflicts.
