# 🧠 Mentor Graph – Product Requirements Document (PRD)

---

# 1. 🧭 Overview

## 1.1 Problem
Users consume large amounts of information (ChatGPT, books, podcasts), but:
- Their influences are **unstructured**
- They lack clarity on **how they think**
- They cannot identify **gaps in their mental models**
- They do not know **which mentors best serve their goals**

---

## 1.2 Solution
Mentor Graph is a tool that:
- Extracts **mentors (people)** from user-provided text (e.g. ChatGPT history)
- Classifies them into **domains**
- Visualises them as a **structured graph**
- Generates **insights to identify and optimise mentor influence**

---

## 1.3 One-Liner
**“Identify the best mentors that best shape your thinking from your AI conversations.”**

---

## 1.4 Vision (Long-Term)
Become a **Thinking OS**:
- Users don’t just consume ideas
- They **understand, refine, and optimise** how they think
- They actively **design their mentor stack**

---

# 2. 🎯 Goals

## 2.1 MVP Goal (POC)
- Accept user input (text / chat)
- Extract:
  - Mentors (people)
  - Domains (wealth, business, engineering, investing)
- Output:
  - Structured mentor tree
  - 1–2 actionable insights
  - Basic optimisation suggestions

---

## 2.2 Success Criteria
- ≥80% accuracy in mentor extraction
- Clear and logical domain classification
- User gains at least **1 meaningful insight**
- End-to-end processing time <10 seconds

---

# 3. 👤 Target Users

- Developers / builders using AI tools frequently
- Self-improvement focused individuals
- People who follow multiple mentors across domains
- Knowledge workers seeking clarity in decision-making

---

# 4. 🔑 Core Features (MVP)

---

## 4.1 Input Module

### Description
Allows users to paste text (ChatGPT conversations, notes, etc.)

### Requirements
- Text input area
- Max length: 10k–50k characters
- Submit button → triggers analysis

---

## 4.2 Mentor Extraction

### Description
Extract names of influential people (mentors) from text

### Approach (POC)
- Use LLM-based extraction or NER
- Filter for relevant figures (entrepreneurs, investors, engineers, etc.)

### Output Example
```json
["Naval Ravikant", "MJ DeMarco", "Alex Hormozi"]
```

## 4.3 Domain Classification

### Domains (fixed for MVP)
- Wealth
- Business
- Engineering
- Investing

### Description
Assign each mentor to one or more domains

### Output Example
```json
{
  "Naval Ravikant": ["Wealth", "Investing"],
  "MJ DeMarco": ["Wealth"],
  "Alex Hormozi": ["Business"]
}
```
## 4.4 Mentor Graph Generator

### Description
Convert structured data into a tree/graph representation

### Output Example
```
You
├── Wealth
│   ├── Naval Ravikant
│   └── MJ DeMarco
├── Business
│   └── Alex Hormozi
```

### Tech Options
- **Simple**: nested list UI
- **Advanced**: graph visualisation (React Flow / D3.js)

## 4.5 Insight & Optimisation Engine

### Description
Generate insights and basic optimisation suggestions

### Example Insights
- "You have no mentors in Investing"
- "Your thinking is heavily skewed towards Engineering"
- "Your mentor set lacks business monetisation influence"

### Example Optimisations
- "Consider adding a business-focused mentor"
- "Your current mentors are strong in building but weak in distribution"

### Logic (POC)
- Count mentors per domain
- Detect:
  - Missing domains
  - Dominant domains
- Suggest balancing improvements

# 5. 🧠 Future Features

## 5.1 Thinking Fingerprint
- % influence per mentor/domain
- Example: "60% Naval-style thinking"

## 5.2 Timeline Evolution
- Track how mentor graph evolves over time

## 5.3 Recommendation Engine
- Suggest:
  - missing mentors
  - relevant books/content
  - complementary thinking styles

## 5.4 Auto Sync
- Browser extension to capture ChatGPT sessions automatically

## 5.5 Editable Graph
- Users can modify:
  - mentors
  - domain classifications

# 6. 🏗️ Technical Design

## 6.1 Architecture (POC)
### Frontend
- React / Next.js
- Simple UI (input → output)

### Backend
- Python (FastAPI) or Node.js
- LLM API for extraction + classification

## 6.2 Data Flow
```
User Input (text)
        ↓
LLM / NER Extraction
        ↓
Mentor List
        ↓
Domain Classification
        ↓
Structured JSON
        ↓
Graph Renderer
        ↓
Insight & Optimisation Engine
        ↓
UI Output
```
## 6.3 API Design
### POST /analyze
#### Request
```json
{
  "text": "User chat content..."
}
```

#### Response
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
# 7. ⚠️ Risks & Constraints

## 7.1 Data Quality
- LLM may misidentify mentors
- Ambiguity in classification

### Mitigation
- Confidence scoring
- Allow manual edits (future)

## 7.2 User Friction
- Copy-paste input is manual

### Mitigation
- Keep UX extremely simple
- Add browser extension later

## 7.3 Overengineering Risk
- Graph visualisation may slow development

### Mitigation
- Start with simple tree UI

# 8. 🧪 MVP Scope (STRICT)

## MUST HAVE
- Text input
- Mentor extraction
- Domain classification
- Basic tree output
- Insights + optimisation suggestions

## NICE TO HAVE
- Graph visualisation
- Editable nodes

## DO NOT BUILD YET
- Authentication / accounts
- Real-time sync
- Complex analytics

# 9. 🚀 Build Plan

## Day 1–2
- Input UI
- API endpoint
- LLM extraction prompt

## Day 3–4
- Domain classification
- JSON structuring

## Day 5
- UI rendering (tree)

## Day 6
- Insight + optimisation engine

## Day 7
- Polish + demo

# 10. 💡 Key Principle

Don't just map mentors
Help users choose better ones
