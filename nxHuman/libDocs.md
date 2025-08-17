# Library & Framework Documentation Cache

This hyper-detailed cache centralizes all tech knowledge, with 100+ concepts, patterns, and links. AI must reference and update this for every implementation.

## Next.js (Core Framework)
1. **App Router**: File-based routing for pages/layouts.
   - Use: Dynamic routes [/products/[id]].
   - Link: https://nextjs.org/docs/app/building-your-application/routing
2. **Server Components**: Server-side rendering for data.
   - Use: Fetch in components, reduce client bundle.
   - Link: https://nextjs.org/docs/app/building-your-application/rendering/server-components
... (Add 20+ more: Dynamic Rendering, Streaming, Metadata, etc.)

## React (UI Library)
1. **Hooks**: State/effect management (useState, useEffect).
   - Pattern: Custom hooks for logic reuse.
   - Link: https://react.dev/reference/react
2. **Context**: Global state without props drilling.
   - Use: Theme/provider for app-wide data.
   - Link: https://react.dev/reference/react/createContext
... (Add 20+ more: Memoization, Portals, Suspense, etc.)

## Node.js/Express (Backend)
1. **Middleware**: Chainable request handlers.
   - Pattern: Auth middleware for routes.
   - Link: https://expressjs.com/en/guide/using-middleware.html
... (Add 10+ more: Routing, Error Handling, etc.)

## Databases (e.g., PostgreSQL/MongoDB)
1. **ORM (Prisma)**: Type-safe queries.
   - Use: Models, migrations, client.
   - Link: https://www.prisma.io/docs
... (Add variants for Mongo, SQL, etc.)

## AI/Cursor Tools
1. **codebase_search**: Semantic code search.
   - Use: "How is auth handled?" → Find implementations.
   - Link: Internal tool docs.
2. **edit_file**: Propose code changes.
   - Pattern: Minimal diffs with // ... existing ...
   - Best Practice: Fix lints post-edit.
... (Add all available tools with patterns.)

## Best Practices & Patterns
1. **Error Handling**: Try/catch, custom errors.
   - Use: Centralized handler for APIs.
2. **Testing (Jest)**: Unit/integration.
   - Pattern: AAA (Arrange, Act, Assert).
   - Link: https://jestjs.io/docs/getting-started
... (Add 50+ patterns: Singleton, Factory, Observer, etc.)

*(AI: Continuously expand with every new concept used)*

---
