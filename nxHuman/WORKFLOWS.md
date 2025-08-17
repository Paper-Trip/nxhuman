# Cursor Workflows (Plan → Build → Refine)

Keep it simple. Use natural prompts; the right personas engage automatically.

## Plan (from Figma/PRD)
Prompt: "Plan feature X from Figma/PRD"
Output:
- Components: names, props/state, interactions
- APIs/services: endpoints, payloads, errors
- Data: schema, validation, contracts
- Tasks: checklist with dependencies
- Acceptance criteria: objective verification
- Risks: with mitigations

## Build (implement incrementally)
Prompt: "Implement <component|api|service> Y"
Guidelines:
- Small, reversible edits; safe defaults
- Explicit naming; defensive programming
- Add minimal tests and brief README updates
- If blocked by unknown stack, propose sensible defaults and proceed

## Refine (analyze, improve, troubleshoot)
Prompt: "Analyze/Improve/Troubleshoot Z"
Output:
- Findings prioritized by impact/risk
- Concrete, diffable edits
- Verification steps (tests/metrics)

## Patterns from Figma
- Map frames to routes/pages; layers to components
- Extract typography, color, spacing → tokens/theme
- Identify reusable primitives (Button, Input, Card, Avatar)
- Derive state and data contracts from interactions

## Safety & Quality Defaults
- Security: validate inputs, sanitize outputs, least privilege
- Performance: measure first, optimize critical paths
- Reliability: graceful errors, retries/backoff where appropriate
- Accessibility: WCAG 2.1 AA checks
- Documentation: update affected README/API docs

# nxHuman Workflows (Amplified 100x)

Workflows are deterministic pipelines that map natural prompts to structured actions, engaging personas dynamically. They scale to complex tasks via recursion and parallelism.

## Plan (from Figma/PRD) - Strategic Blueprinting
Prompt: "Plan feature X from Figma/PRD"
- **Sub-Steps**:
  1. Measure: Scan Figma/assets for elements (use mcp_Figma tools).
  2. Map: Frames → routes; layers → components with props/state.
  3. Design: APIs (endpoints, schemas); data models (validation).
  4. Checklist: Dependencies, timelines, risks/mitigations.
  5. Criteria: Objective metrics (e.g., "Feature complete if tests pass 100%").
- **Decision Tree**: If unknowns >3, query user or propose defaults.
- **Error Handling**: Invalid Figma → Fallback to text desc.
- **Personas**: Architect leads; Frontend for UI, Backend for services.
- **Amplification**: Generate variants (e.g., mobile/desktop) for 100x coverage.

## Build (Implement Incrementally) - Safe Construction
Prompt: "Implement <component|api|service> Y"
- **Sub-Steps**:
  1. Plan mini: Break to atomic tasks.
  2. Code: Minimal viable with types, errors, tests.
  3. Integrate: Hook to existing (use grep for points).
  4. Doc: Inline comments + README update.
- **Decision Tree**: If stack unknown, reference libDocs.md or official docs.
- **Error Handling**: Build failure → Auto-debug with Analyzer.
- **Personas**: Domain-specific (e.g., Frontend); Refactorer for clean code.
- **Amplification**: Generate 10x test cases automatically.

## Refine (Analyze/Improve/Troubleshoot) - Iterative Polish
Prompt: "Analyze/Improve/Troubleshoot Z"
- **Sub-Steps**:
  1. Measure: Metrics (perf, security scans).
  2. Prioritize: Issues by impact/effort.
  3. Fix: Concrete diffs, verification steps.
  4. Validate: Re-run gates.
- **Decision Tree**: High impact? Escalate to ultrathink.
- **Error Handling**: No improvements? Confirm with evidence.
- **Personas**: Analyzer/Performance/Security rotate.
- **Amplification**: Simulate 100 scenarios for robustness.

## New: Debug (Root-Cause Resolution)
Prompt: "Debug issue W"
- **Sub-Steps**: Repro, hypothesize (3 options), test, fix, prevent.
- **Decision Tree**: Intermittent? Add logging; systemic? Refactor.
- **Error Handling**: Unreproducible → Instrument code.
- **Personas**: Analyzer leads; Mentor explains.
- **Amplification**: Auto-generate debug tools (e.g., custom logs).

## New: Optimize (Efficiency Maximization)
Prompt: "Optimize V"
- **Sub-Steps**: Profile, identify bottlenecks, apply fixes, benchmark diff.
- **Decision Tree**: CPU vs IO? Tailor optimizations.
- **Error Handling**: Regression? Rollback + alert.
- **Personas**: Performance/Optimizer.
- **Amplification**: Explore 100x algos (e.g., from O(n^2) to O(n)).

## New: Self-Improve (Framework Evolution)
Prompt: "Evolve framework"
- **Sub-Steps**: Review logs, identify patterns, update rules/docs.
- **Decision Tree**: Frequent errors? Add new gate/persona.
- **Error Handling**: Conflicts? Prioritize evidence.
- **Personas**: AI Specialist/Integrator.
- **Amplification**: Simulate evolutions for 100x smarter system.

## Figma Patterns (Deepened)
- Extract tokens programmatically (use mcp_Figma tools).
- Rule: Always validate against design.md.

## Safety Defaults (Amplified)
- Every step: Apply quality gates; log evidence.
