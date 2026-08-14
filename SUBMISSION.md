# Currency Agent Starter — Submission

Repo: https://github.com/groovydhruv/currency-agent-starter

Stack: Next.js 16 (App Router) + TypeScript, plain CSS, no other dependencies.
Start command: `npm install && npm run dev` → http://localhost:3000

## Scaffold Instruction Used

The text below is the exact instruction given to Claude Code to build the starting point of
this project, copied verbatim before any edits were made to what it produced.

> Scaffold a new Next.js project using the App Router and TypeScript, in the current
> directory. It must start with a single command — tell me what that command is when you're
> done. The main page must live at `app/page.tsx`, because that is the file I am going to edit
> next.
>
> `app/page.tsx` must render a question input box and exactly four labeled blocks below it,
> labeled **Plan**, **Tool Call**, **Tool Result**, and **Answer**. Use those four words as the
> visible labels — do not substitute placeholder text like "Section 1" or lorem ipsum. The
> blocks can be empty and static for now; no interactivity, no state, no submit handler.
>
> Do not add anything else. Specifically: no database or ORM, no styling library (no Tailwind,
> no CSS-in-JS, no component kit), no authentication, no API routes, no currency conversion
> logic, no example or demo pages beyond `app/page.tsx`, no tests, and no CI config. Plain CSS
> in the default global stylesheet is fine and is all the styling I want.
>
> `.gitignore` should exclude `node_modules` and Next.js build output only. Do not add data
> files, JSON fixtures, or anything under `data/` to `.gitignore`.

### What came back, and what had to be corrected

The scaffold got the important things right: `app/page.tsx` existed, the router was the App
Router, and there was no Tailwind, ESLint config, API route, or test setup.

Three things arrived that the instruction had excluded, and were removed rather than kept:

1. A marketing demo page (`app/page.module.css` plus `public/file.svg`, `globe.svg`,
   `next.svg`, `vercel.svg`, `window.svg`) — deleted.
2. `AGENTS.md` and `CLAUDE.md`, generated automatically by Next — deleted, and
   `agentRules: false` set in `next.config.ts` so the dev server stops recreating them.
3. `next/font/google` imports in `app/layout.tsx`, which make the first render depend on a
   network fetch — replaced with a system font stack.

## Rate Table

`data/rates.json` holds a fixed table of ten currency pairs (USD/EUR, EUR/USD, USD/JPY,
JPY/USD, GBP/USD, USD/GBP, USD/CAD, USD/INR, EUR/GBP, AUD/USD) with an `as_of` date. It is a
static fixture, not live market data. It is committed to the repo and is not covered by
`.gitignore`.

## Sample Lookup

Run with `npm run dev`, opened at http://localhost:3000.

**What I typed into the question box:**

```
100 USD to EUR
```

**What the app returned:**

> **PLAN**
> ```
> 1. Read the pair as USD/EUR with an amount of 100.
> 2. Look USD/EUR up in the fixed rate table (data/rates.json).
> 3. Multiply 100 by the rate and report the result.
> ```
>
> **TOOL CALL**
> ```
> lookupRate({ pair: "USD/EUR" })
> ```
>
> **TOOL RESULT**
> ```json
> {
>   "pair": "USD/EUR",
>   "from": "USD",
>   "to": "EUR",
>   "rate": 0.9183
> }
> ```
>
> **ANSWER**
> ```
> 100 USD = 91.83 EUR (rate 0.9183, as of 2026-08-14).
> ```
