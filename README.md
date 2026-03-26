# Mentor Graph

**Identify the mentors that shape your thinking** from pasted AI conversations or notes. The app extracts people, classifies them into **Wealth**, **Business**, **Engineering**, and **Investing**, renders a **pedigree-style mentor graph**, and surfaces **insights** and **optimisation** suggestions.

The **Sage** is the product persona: a guide through the flow (landing, analyse, report). Product goals and scope live in [`docs/PRD.md`](docs/PRD.md).

---

## Features

- **Analyse** — Copy a prompt for ChatGPT/Claude, paste the reply, optional **saved drafts** (Prompt 1, 2, …) with delete.
- **Model choice** — OpenAI model dropdown (allowlisted IDs); preference stored in the browser.
- **Results** — Mentor graph (family-tree style), counsel (insights + paths to balance).
- **Report** — [`/report`](app/report/page.tsx) reads the latest saved analysis; **Print / Save as PDF** and **Download PDF** (jsPDF).
- **Persistence** — Latest analysis and drafts live in **localStorage** (this browser only).

---

## Stack

| Layer | Choice |
|--------|--------|
| App | [Vinext](https://vinext.io/) (Next.js–style App Router on Vite), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| API | `POST /api/analyze` — Zod validation, OpenAI chat completions (JSON), local insight rules |
| Deploy | **Cloudflare Workers** via `vinext deploy` / Wrangler (`wrangler.jsonc`, `worker/index.ts`) |

---

## Prerequisites

- **Node.js** 20+ recommended
- An **[OpenAI API key](https://platform.openai.com/api-keys)** with access to the models you enable in code (`lib/schemas/analyze.ts`)

---

## Local development

```bash
npm install
cp .env.example .env
# Edit .env and set OPENAI_API_KEY=sk-...
npm run dev
```

Open the URL Vinext prints (usually `http://localhost:3000`).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build (`vinext build`) |
| `npm run start` | Run last build locally (Node) |
| `npm run deploy` | Build and deploy to Cloudflare Workers (`vinext deploy`) |

---

## Environment variables

| Variable | Required | Where |
|----------|----------|--------|
| `OPENAI_API_KEY` | Yes (for `/api/analyze`) | `.env` locally; **Worker secret** in production |

Never commit `.env`. See [`.env.example`](.env.example).

---

## Deploying to Cloudflare

1. **Login:** `npx wrangler login`
2. **First deploy:** `npm run deploy` (add Cloudflare **account id** to `wrangler.jsonc` if prompted).
3. **Secret on the Worker** (required for analyse in prod):

   ```bash
   npx wrangler secret put OPENAI_API_KEY
   ```

   Updating the secret does **not** require a new deploy for the code bundle to change; it applies to the live Worker.

**Git-connected builds (Cloudflare dashboard):** a typical pair is **Build:** `npm run build`, **Deploy:** `npx wrangler deploy`. Set `OPENAI_API_KEY` in the Worker’s **Variables and secrets** in the dashboard (the repo does not ship your key).

---

## API

### `POST /api/analyze`

**Body (JSON):**

```json
{
  "text": "…conversation or notes…",
  "model": "gpt-5.4-mini"
}
```

- `text` — required, max 50k characters.  
- `model` — optional; must be one of `ANALYZE_MODEL_IDS` in [`lib/schemas/analyze.ts`](lib/schemas/analyze.ts).

**Response:** `{ mentors, domains, insights, optimisations }` aligned with [`AnalyzeResponse`](lib/schemas/analyze.ts).

---

## Project layout (high level)

```text
app/           # Routes: landing, analyze, report, api/analyze
components/    # UI (mentor tree, input, Sage, report, model select, …)
lib/           # Schemas, OpenAI extraction, insights, storage helpers, PDF
public/        # Static assets (e.g. sage.svg, favicon)
worker/        # Cloudflare Worker entry (Vinext)
docs/          # PRD, mascot notes, tech notes
```

---

## Docs

- [`docs/PRD.md`](docs/PRD.md) — product requirements  
- [`docs/MASCOT.md`](docs/MASCOT.md) — Sage mascot / voice  
- [`docs/TECH_STACK.md`](docs/TECH_STACK.md) — stack notes (may overlap this README)

---

## License

Private / all rights reserved unless you add a license file.
