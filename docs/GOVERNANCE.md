# Maintaining Memail

Saivra maintains Memail as an independent Bulwark fork under the retained
license. The current code owner is @GMustafa-s. CODEOWNERS assigns review
responsibility; it does not grant access.

## Main branch protections

Two active GitHub rulesets protect main. The integrity ruleset requires a PR,
an up-to-date branch, resolved review conversations and successful GitHub
Actions checks: Vitest, Lint and typecheck, and Perf guard. It blocks force
pushes and deletion, allows merge commits only and has no bypass actors.

The contributor-review ruleset requires one independent approval, code-owner
review, approval of the latest push and dismissal of stale approvals. Org
owners may bypass this review rule **through a PR only** so the sole current
maintainer can merge their own work. That exception cannot bypass CI, permit
direct pushes, override unresolved conversations or rewrite main.

Unit tests run in four shards. A single required Vitest gate fails if any
shard fails, is cancelled or is skipped. The Git merge helper runs separately
with node:test. PR workflows run without production secrets. Main pushes also
run checks; feature pushes do not duplicate their PR's expensive suite.

Dependency review checks newly introduced high/critical advisories. CodeQL
runs on PRs, main and weekly. Dependabot proposes dependency/action updates;
updates require review and checks rather than automatic merging. Security
workflows become required gates only after their first successful run.

## Review and release

Review authentication, JMAP mutations, sanitization, offline mail, data
migrations, workflow permissions, dependencies and licensing explicitly.
Use synthetic data. Keep deployment separate from a source merge. Follow
[release policy](RELEASING.md), [security reporting](../SECURITY.md) and the
[upstream merge guide](../.memail/UPSTREAM.md).

A branch is not merged merely because it exists. Superseded experiments and
incompatible upstream changes stay isolated with a written reason. Never
reintroduce postponed ReUI work by indiscriminately merging old branches.
