# nxHuman — One-command setup for deterministic, AI‑assisted engineering

nxHuman is a small CLI that installs an engineering framework into your repo so your AI assistant (e.g., Cursor) works deterministically. It adds shared rules, workflows, personas, and a single source of truth your team and AI can follow.

## What you get (written to your repo)

-   `.cursorrules`: Core principles and guardrails the AI follows in this project.
-   `nxHuman/` folder with living docs the AI reads:
    -   `project-context.json`: Single source of truth (project name, platform, stack, decisions, unknowns).
    -   `PERSONAS.md`: Expert lenses (Architect, Frontend, Backend, QA, etc.).
    -   `WORKFLOWS.md`: Plan → Build → Refine pipelines.
    -   `design.md`: Brand identity, colors, typography (fill to keep UI consistent).
    -   `libDocs.md`: Knowledge cache and official doc links.
    -   `system.md`: Deterministic operating rules for complex tasks.

It does not change your application code.

## Quickstart

```bash
# Preview without writing
npx nxhuman --dry-run

# Interactive install (choose a platform)
npx nxhuman

# Non‑interactive install for Next.js
npx nxhuman --yes --platform=next
```

Supported platforms: `next`, `ios`, `flutter`.

## What to do next

1. Open your repo in Cursor so the AI reads `.cursorrules` and `nxHuman/*`.
2. Fill `nxHuman/project-context.json` (decisions, unknowns) and `nxHuman/design.md` (brand tokens).
3. Build using prompts like “Plan feature X” or “Implement API Y”.

## Flags

-   `--dry-run`: Show planned writes without modifying files.
-   `--yes`: Non‑interactive mode (required in CI). In CI, `CI=true` is auto‑detected.
-   `--force`: Overwrite existing nxHuman files.
-   `--platform=next|ios|flutter`: Required with `--yes`.

## Safety / overwrite behavior

-   If nxHuman files already exist, the CLI stops unless you pass `--force` (or run `--dry-run`).
-   If a root `project-context.json` exists, it is merged then moved to `nxHuman/project-context.json`.

## CI usage

```bash
npx nxhuman --yes --platform=next --force
```

## Uninstall

```bash
rm -f .cursorrules && rm -rf nxHuman
```

---

License: AGPL‑3.0
