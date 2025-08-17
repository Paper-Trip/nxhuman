# Project Design System

This is the exhaustive, deterministic design spec, auto-extracted from Figma and enforced across the project. Use exact values; deviations require decision log entry.

## 1. Brand Identity & Color Palette (with Variants)
- **Primary**: #0A74DA (Light: #3B9DF0, Dark: #065BB8) - Buttons, links; contrast ratio >4.5:1 on white.
- **Secondary**: #F3F4F6 (Light: #FFFFFF, Dark: #D1D5DB) - Backgrounds; min opacity 0.8 for overlays.
- **Accent**: #FFC107 (Light: #FFD54F, Dark: #FFA000) - Highlights; use sparingly (<10% screen).
- **Neutral**: #6B7280 (Light: #9CA3AF, Dark: #4B5563) - Text; body font-size 16px base.
- **Success**: #10B981 (Light: #34D399, Dark: #047857) - Toasts; animate fade-in 300ms.
- **Warning**: #F59E0B (Light: #FBBF24, Dark: #D97706) - Alerts; pulse animation for urgency.
- **Error**: #EF4444 (Light: #F87171, Dark: #B91C1C) - Validation; shake animation on input.

Rules: All colors must pass WCAG contrast. Auto-generate theme file (e.g., CSS vars).

## 2. Typography (with Scales and Rules)
- **Font Family**: Inter (Fallback: system-ui); weights: 300-700.
- **H1**: 36px, Bold (700), line-height 1.2, letter-spacing -0.02em.
- **H2**: 24px, Semi-Bold (600), line-height 1.3.
- **Body**: 16px, Regular (400), line-height 1.5.
- **Caption**: 12px, Light (300), line-height 1.4.
- Scales: Modular (ratio 1.25) - e.g., 12px → 15px → 18.75px.
- Rules: Max line length 75ch; hyphenate long words; a11y: readable fonts, no all-caps >20 chars.

## 3. Spacing & Layout (Grid System)
- **Scale**: 4px base (rem: 0.25rem); multipliers: 1,2,4,6,8,12,16,24,32,48.
- **Grid**: 12-column flexible; gutters 16px (mobile: 8px).
- **Padding/Margins**: Consistent (e.g., cards: 16px all sides).
- Rules: Use flex/grid over floats; responsive breakpoints: mobile <768px, tablet 768-1024, desktop >1024.

## 4. Icons & Assets (with Guidelines)
- **Icon Set**: Heroicons (or custom); sizes: 16px, 24px, 32px; stroke: 1.5px.
- **Primary Logo**: /assets/logo.svg (variants: color/mono); min size 32px.
- **Favicon**: /assets/favicon.ico (32x32).
- **Hero Image**: /assets/hero.png (aspect 16:9, optimized <100KB).
- Rules: SVGs for scalability; alt text mandatory; lazy-load off-screen.

## 5. Components & Variants (Primitives)
- **Button**: Primary (bg-primary, text-white), Secondary (bg-secondary, text-primary); sizes: sm/md/lg; states: hover (+shadow), disabled (opacity 0.5).
- **Input**: Border (1px neutral), focus (ring-primary); validation: error (border-error).
- **Card**: Shadow-md, rounded-lg; hover: lift 2px.
- Rules: All interactive elements >44x44px tap target; keyboard nav support.

## 6. Accessibility Guidelines
- WCAG 2.1 AA: Contrast >4.5:1, semantic HTML, ARIA where needed.
- Rules: Screen reader tests; no auto-focus traps; color-blind safe palette.

## 7. Figma Extraction Rules
- Auto-extract via mcp_Figma tools: Colors to vars, typography to classes.
- Update this file post-extract; validate with quality gates.
