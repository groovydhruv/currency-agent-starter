# Currency Agent Starter

A minimal Next.js (App Router, TypeScript) starting point for a currency lookup agent. Ask for
a currency pair and the page shows the agent's trace across four blocks: **Plan**, **Tool
Call**, **Tool Result**, and **Answer**.

![The page running, showing a 250 USD to KWD lookup](docs/screenshot.png)

## Run it

```bash
npm install && npm run dev
```

Then open http://localhost:3000 and try `100 USD to EUR`.

Accepted question formats: `USD/EUR`, `USD to EUR`, `100 USD to EUR`, `50 GBP in USD`. A
question can also be passed in the URL — http://localhost:3000/?q=250+USD+to+KWD — which makes
a given lookup linkable.

## Precision

`data/rates.json` is the source of truth for rounding. Every row carries a `decimals` field
holding the number of minor units the target currency prints with, and `app/page.tsx` calls
`.toFixed(entry.decimals)` rather than hardcoding a width. So JPY prints `369050` with no
decimal point, KWD prints `76.662` with three, and EUR prints `91.83` with two — all from the
same code path. Adding a currency means adding a row, not touching the UI.

## Layout

- `app/page.tsx` — the question box, the four labeled blocks, and the lookup logic.
- `app/globals.css` — all styling. No CSS framework.
- `data/rates.json` — the fixed rate table. Static fixture, not live market data.
- `docs/screenshot.png` — the page running with a real lookup.
- `SUBMISSION.md` — the verbatim scaffold instruction and three sample lookups.
