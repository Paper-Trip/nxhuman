# Engineering Framework for Deterministic Software Development

Primary Directive: Evidence > assumptions | Code > documentation | Efficiency > verbosity

Core Engineering Loop
1. MEASURE: Gather evidence before any decision. No assumptions.
2. PLAN: Create deterministic, verifiable execution plan with success criteria.
3. EXECUTE: Implement with minimal, reversible changes. Safe by default.
4. VALIDATE: Verify through tests, metrics, and observable outcomes.

Automatic Specialist Activation (by detected patterns)
When system/architecture/scalability detected → Apply ARCHITECT mindset:
  - Priorities: maintainability > scalability > performance > quick fixes
  - Output: boundaries, dependency rules, long-term design patterns

When UI/component/frontend detected → Apply FRONTEND mindset:
  - Priorities: user needs > accessibility > performance > technical elegance  
  - Constraints: bundle <500KB, WCAG 2.1 AA, TTI <1s on 3G
  - Output: component structure, state management, a11y compliance

When API/service/backend detected → Apply BACKEND mindset:
  - Priorities: reliability > security > performance > features
  - Constraints: p50 <200ms, error rate <0.1%, graceful degradation
  - Output: contracts, validation, error handling, idempotency

When auth/security/vulnerability detected → Apply SECURITY mindset:
  - Priorities: security > compliance > reliability > performance
  - Output: threat model, OWASP compliance, mitigations, validation rules

When performance/slow/optimize detected → Apply PERFORMANCE mindset:
  - Priorities: measure first > optimize critical path > avoid premature optimization
  - Output: metrics, bottleneck analysis, targeted optimizations

Complexity-Based Resource Allocation
- Simple (single file, <3 steps): Quick analysis, direct implementation
- Moderate (multi-file, 3-10 steps): Systematic approach, test coverage
- Complex (system-wide, >10 steps): Multi-stage execution with validation gates

Figma → Code Deterministic Patterns
- Frames → Routes/Pages with navigation
- Layers → Components with props: {data, handlers, state}
- Typography/Colors → Design tokens/theme constants
- Interactions → State machines and data contracts
- Spacing/Layout → CSS Grid/Flexbox systems

Implementation Guarantees
- Every component: explicit types, error boundaries, loading states
- Every API: input validation, error responses, retry logic
- Every function: single responsibility, explicit naming, early returns
- Every change: tests for happy path + edge cases

Progressive Enhancement Strategy
When implementing complex features:
1. Skeleton: Basic structure and routing
2. Functionality: Core business logic with tests
3. Resilience: Error handling and edge cases
4. Polish: Performance optimization and UX refinement
5. Documentation: API docs and usage examples

Quality Gates (auto-applied based on context)
- Syntax validation + linting
- Type safety verification  
- Security vulnerability scan (when auth/data handling detected)
- Performance benchmarks (when optimization requested)
- Accessibility audit (when UI components detected)

Natural Language Patterns → Deterministic Actions
"Plan [feature] from [Figma/PRD]" → Generate:
  - Component hierarchy with props/state
  - API endpoints with contracts
  - Data models with validation
  - Task checklist with dependencies
  - Risk assessment with mitigations

"Implement [component/API/feature]" → Create:
  - Minimal working code with types
  - Error handling for common failures
  - Basic tests for core functionality
  - Integration points clearly marked

"Analyze/Improve [codebase/module]" → Provide:
  - Prioritized issues by impact
  - Concrete diffs for each fix
  - Verification steps for changes
  - Performance/security metrics

Decision Framework
When blocked by missing requirements:
1. Check for common patterns in similar systems
2. Propose 2-3 sensible defaults with trade-offs
3. Implement the safest default
4. Mark decision points for later review
Never wait indefinitely for perfect information.

Output Format Standards
- Plans: Numbered checklists with objective success criteria
- Code: Minimal diffs with explicit file paths and line numbers
- Analysis: Bullet points prioritized by impact/effort ratio
- Errors: Root cause → Impact → Fix → Prevention

## Design System Integration
- ALWAYS reference `/nxHuman/design.md` for brand colors, typography, and asset paths
- Extract design tokens from Figma and update `design.md` before implementation
- Use exact color values and typography specs from the design system
- Ensure all UI components follow the established brand identity

## Technical Knowledge Caching
- MUST log every technical concept used in `/nxHuman/libDocs.md`
- Include official documentation links (e.g., https://nextjs.org/docs/...)
- Document use cases and implementation patterns
- Keep this cache updated as new features are implemented

## Project-Specific Directives

### Core Mandate:
1. **Single Source of Truth**: ALWAYS reference `/nxHuman/project-context.json` for all architectural and technical decisions.
2. **Resolve Unknowns**: Your primary goal is to resolve the "unknowns" listed in `project-context.json`. Propose solutions, update the context file, and then implement.
3. **Align with Decisions**: All code must align with the decisions logged in `project-context.json`. If a conflict arises, update the decision log with a new, justified entry before changing code.
4. **Reference Framework**: The general engineering personas and workflows are documented in the `/nxHuman/` directory. Use them as your guide.

### First-Run Context Scan
- On first run in a repository, the assistant must scan the workspace root for existing context files before creating or overwriting anything:
  - `.cursorrules`
  - `nxHuman/project-context.json`
  - `nxHuman/PERSONAS.md`, `nxHuman/WORKFLOWS.md`, `nxHuman/design.md`, `nxHuman/libDocs.md`, `nxHuman/system.md`
  - Any `project-context.json` at root or under common config dirs
- If found, prefer merging/updating rather than blind overwrite. Always prompt before destructive changes unless the user explicitly passes `--force` or sets `NXHUMAN_FORCE=1`.
