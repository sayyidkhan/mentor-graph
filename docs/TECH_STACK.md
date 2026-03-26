# Mentor Graph – Technical Stack (MVP)

## 1) Objective
This document defines the recommended technical stack to build the Mentor Graph MVP described in `docs/PRD.md`, with a strong bias for:
- Fast iteration
- Simple architecture
- Reliable AI output quality
- Low ops overhead

---

## 2) Recommended Stack (MVP)

### Frontend
- **Framework:** ViNext + React + TypeScript
- **UI Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (optional, for fast high-quality components)
- **State:** Local React state first; use Zustand only if complexity grows
- **Graph View:** Start with simple nested tree UI; optionally upgrade to React Flow

### Backend
- **API Layer:** ViNext server routes (fullstack mode) or separate FastAPI/Node API service
- **Language:** TypeScript (single-language stack for faster delivery)
- **Validation:** Zod (request/response validation)

### AI / NLP
- **Primary:** LLM API (OpenAI or Anthropic) for mentor extraction + domain classification
- **Fallback/Support:** Lightweight NER (spaCy or compromise) if needed later
- **Prompting Strategy:** Structured JSON output schema + strict domain whitelist

### Data / Storage
- **MVP:** No persistent database required (stateless processing)
- **Optional Logging:** PostHog or lightweight server logs for debugging quality
- **Future:** PostgreSQL + Prisma when adding history/timeline features

### Infrastructure / Deployment
- **Hosting:** Vercel / Netlify / Cloudflare Pages (frontend), plus Railway/Render if API is separate
- **Environment Management:** Local `.env` for dev, platform-managed env vars in deployment
- **CI/CD:** GitHub Actions + platform preview deployments

### Observability
- **Error Tracking:** Sentry (optional but recommended)
- **Basic Metrics:** API latency, extraction success/failure, parse errors

---

## 3) Why This Stack

- **Fastest path to MVP:** lightweight frontend with optional same-repo API routes
- **Lower context switching:** TypeScript across frontend + backend
- **Matches PRD constraints:** supports <10s response target with minimal architecture
- **Easy to extend:** can add DB, auth, and advanced graph visualization later without rewrite

---

## 4) Architecture (MVP)

```text
User (ViNext UI)
   -> POST /api/analyze (or backend /analyze)
      -> Input validation (Zod)
      -> LLM extraction + domain classification
      -> Insight + optimisation logic
      -> Return structured JSON
   -> Render mentor tree + insights
```

---

## 5) API Contract (Aligned with PRD)

### Endpoint
- `POST /api/analyze`

### Request
```json
{
  "text": "User chat content..."
}
```

### Response
```json
{
  "mentors": ["Naval Ravikant", "MJ DeMarco"],
  "domains": {
    "Naval Ravikant": ["Wealth", "Investing"],
    "MJ DeMarco": ["Wealth"]
  },
  "insights": [
    "You lack Business-focused mentors",
    "Your thinking is heavily wealth-oriented"
  ],
  "optimisations": [
    "Consider adding a mentor focused on business or monetisation"
  ]
}
```

### Fixed Domain Enum (MVP)
- `Wealth`
- `Business`
- `Engineering`
- `Investing`

---

## 6) Suggested Project Structure

```text
mentor-graph/
  docs/
    PRD.md
    TECH_STACK.md
  app/
    layout.tsx
    page.tsx
    globals.css
    api/
      analyze/
        route.ts
  components/
    InputPanel.tsx
    MentorTree.tsx
    InsightsPanel.tsx
  lib/
    ai/
      extractMentors.ts
    insight/
      generateInsights.ts
    schemas/
      analyze.ts
  public/
  package.json
  tsconfig.json
  postcss.config.cjs
  next.config.js
  .env.example
```

---

## 7) Implementation Phases

### Phase 1 (Core MVP)
- Input UI + submit action
- `POST /api/analyze`
- LLM extraction + classification prompt
- Basic tree rendering
- Insights + optimisation rules

### Phase 2 (Stability)
- Better prompt constraints and retries
- Error states + loading states
- Basic telemetry and latency tracking

### Phase 3 (Optional Nice-to-Have)
- React Flow visualization
- Editable mentor/domain nodes

---

## 8) Technical Risks and Mitigations

### Risk: LLM output inconsistency
- Enforce strict JSON schema and server-side parsing
- Retry once on malformed output
- Keep a deterministic post-processing layer

### Risk: Misclassification accuracy
- Force allowed domain enum only
- Add confidence notes internally (future)
- Support manual correction in later phase

### Risk: Slow response time
- Limit input size for MVP
- Use concise prompts
- Keep processing pipeline linear and minimal

---

## 9) Non-Goals (MVP)
- Authentication and user accounts
- Background sync/browser extension
- Advanced analytics dashboard
- Fully dynamic/open-ended ontology beyond 4 fixed domains

---

## 10) Dependencies (Starter)

```bash
# Start from the official ViNext starter from https://vinext.io/
npm install zod
npm install openai
npm install clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
```

Optional:
```bash
npm install @xyflow/react
npm install @sentry/browser
```

---

## 11) Final Recommendation
Build the MVP with **ViNext + TypeScript + LLM API + Zod**, keep it stateless first, and optimize for speed of learning. Add persistence and advanced graph tooling only after validating extraction quality and user insight value.
