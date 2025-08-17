# System Engineering Manual

This manual provides an ultra-detailed blueprint for the nxHuman framework's deterministic operations, amplified with advanced patterns, examples, and self-optimizing logic. It transforms the base rules into a hyper-efficient, AI-native system.

## 1. Core Operating Model: Wave Orchestration (Expanded)

Wave Orchestration is a fractal, multi-layer execution model for handling complexity at scale. It recursively breaks tasks into waves, each with sub-waves, enabling 100x deeper analysis without token waste.

**Enhanced Auto-Activation Triggers** (with Metrics):
- Complexity Score: Calculated as (file_count * 0.4 + op_types * 0.3 + dep_depth * 0.3); trigger if >= 0.7.
- Example: Refactoring 50 files with 5 ops (add/remove/edit) and dep chains >3 → Score 0.85 → Activate.
- New: Resource Threshold - If token usage >50% projected, auto-scale to sub-waves.

**Wave Strategies (with Examples and Rules)**:
- **Systematic**: Step-by-step deconstruction. Rule: Always start with evidence gathering (e.g., grep for patterns). Example: Auditing security - Wave 1: Scan all auth calls; Wave 2: Model threats.
- **Progressive**: Build iteratively with validation loops. Rule: Each iteration must improve a metric (e.g., perf +10%). Example: Optimize load time - Measure baseline, apply cache, re-measure.
- **Adaptive**: Dynamically reconfigure based on runtime data. Rule: If failure rate >10%, switch personas (e.g., from frontend to performance). Example: UI bug - Adapt to include a11y checks if initial fix fails.
- **Enterprise**: Parallel waves across agents. Rule: Limit to 4 concurrent sub-agents; merge results with conflict resolution. Example: 200-file migration - Delegate by directory.
- **Validation**: Inter-wave gates. Rule: 100% pass rate required; auto-retry failed gates once. Example: Post-implement, run all 8 quality gates.

**Amplified Wave Cycle (with Sub-Steps)**:
1. **Review**: Analyzer scans codebase (use grep/read_file). Sub-steps: Gather metrics, identify patterns, score risks.
2. **Plan**: Architect creates executable checklist. Sub-steps: Define success criteria (e.g., "TTI <1s"), assign personas, estimate effort.
3. **Implement**: Domain expert executes. Sub-steps: Minimal diffs, early returns, type-safe code.
4. **Validate**: QA runs tests. Sub-steps: Metrics diff (pre/post), edge case simulation, auto-fix minor issues.

New Rule: Waves self-optimize - If cycle time > expected, compress next wave (e.g., reduce verbosity).

## 2. Parallel Processing: Sub-Agent Delegation (Expanded)

Delegation creates a distributed intelligence network, scaling to 100x larger codebases via parallel tool calls.

**Enhanced Triggers** (Quantitative):
- Dir Count >7 OR File Count >50 OR Score >0.8.
- New: Fan-out Factor - Delegate if task branches >3 (e.g., multi-module change).

**Strategies (with Protocols)**:
- **By Files/Folders**: Assign agents per path. Protocol: Sync merges via diff resolution. Example: Refactor /src/components - One agent per subdir.
- **By Task Type**: Specialized focus. Protocol: Agents report independently, architect synthesizes. Example: Audit - Quality checks complexity, Security scans OWASP, etc.
- New: Hybrid - Combine for massive tasks (e.g., delegate folders + types).

**Delegation Rules**:
- Max Agents: 5 to avoid overload.
- Communication: Agents share summaries (e.g., "Found vuln in auth.ts").
- Conflict Resolution: Prioritize security > performance > others.

## 3. Cognitive Engine: Thinking Depth & Resource Allocation (Expanded)

A adaptive reasoning tiers system, now with predictive modeling for 100x efficiency.

**Tiers (with Activation Examples)**:
- **think** (~4K): Standard. Example: Single-file fix - Quick grep + edit.
- **think-hard** (~10K): Deep. Example: Refactor module - Analyze deps, propose patterns.
- **ultrathink** (~32K+): Exhaustive. Example: System migration - Full codebase search, simulations.

**Resource Management (Predictive)**:
- Forecast usage: Pre-scan task to estimate tokens (e.g., file size * factor).
- Threshold Actions: <75% full; 75-85% compress outputs (bullet points only); 85-95% drop non-essential (e.g., comments); >95% abort to essentials.
- New: Auto-Downgrade - If over-estimate, drop to lower tier mid-wave.

## 4. Quality & Validation Framework (Expanded)

Now with automated enforcement and self-healing.

**8 Quality Gates (with Checks & Fixes)**:
1. **Syntax**: Run linter. Fix: Auto-correct via tool.
2. **Type Safety**: Check types. Fix: Infer/add types.
3. **Linter**: Enforce rules. Fix: Apply fixes.
4. **Security**: OWASP scan. Fix: Inject guards.
5. **Tests**: >80% coverage. Fix: Generate missing tests.
6. **Performance**: Benchmark diffs. Fix: Optimize hot paths.
7. **Docs**: Coverage check. Fix: Auto-gen stubs.
8. **Integration**: E2E run. Fix: Debug failures.

**Completion Criteria**: All gates green + criteria met + evidence logged.

## 5. System Governance: Flag Precedence & Safety (Expanded)

Strict hierarchy with audit trails.

**Flag Order**: As is, plus logging each override.

**Emergency Protocols**:
- Degradation: Step-down features.
- Recovery: Tool fallback, compression, user query.
- New: Audit Log - Record all emergencies for review.

## 6. New: AI-Native Workflows

Integration with Cursor tools for seamless ops.

- **Tool Chaining**: Always parallelize (e.g., read_file + grep).
- **Self-Review**: Post-edit, run lints and auto-fix.
- Example: "Implement X" → Plan, code, lint, commit.

## 7. New: Self-Improving Systems

Framework evolves via feedback.

- **Learning Loop**: Log outcomes, update rules (e.g., if perf fix fails, add new gate).
- **Versioning**: Track changes in libDocs.md.

## 8. New: Cursor Integration

- Use read_lints post-edit.
- Prefer absolute paths.
- Handle unsaved files via tools.

