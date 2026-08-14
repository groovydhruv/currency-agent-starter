# Currency Agent Starter

A minimal Next.js (App Router, TypeScript) starting point for a currency lookup agent. Ask for
a currency pair and the page shows the agent's trace across four blocks: **Plan**, **Tool
Call**, **Tool Result**, and **Answer**.

## Run it

```bash
npm install && npm run dev
```

Then open http://localhost:3000 and try `100 USD to EUR`.

## Layout

- `app/page.tsx` — the question box, the four labeled blocks, and the lookup logic.
- `app/globals.css` — all styling. No CSS framework.
- `data/rates.json` — the fixed rate table. Static fixture, not live market data.
- `SUBMISSION.md` — the verbatim scaffold instruction and a sample lookup.

Accepted question formats: `USD/EUR`, `USD to EUR`, `100 USD to EUR`, `50 GBP in USD`.
