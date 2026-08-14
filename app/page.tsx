"use client";

import { useEffect, useState } from "react";
import ratesTable from "../data/rates.json";

type Trace = {
  plan: string;
  toolCall: string;
  toolResult: string;
  answer: string;
};

const CURRENCY = "[A-Za-z]{3}";
const QUERY = new RegExp(
  `^\\s*(?:([0-9]*\\.?[0-9]+)\\s*)?(${CURRENCY})\\s*(?:/|->|to|in)\\s*(${CURRENCY})\\s*\\??\\s*$`,
  "i"
);

function lookup(query: string): Trace {
  const match = query.match(QUERY);

  if (!match) {
    return {
      plan: "Parse the question into an amount, a source currency and a target currency.",
      toolResult: "",
      toolCall: "",
      answer:
        'I could not read a currency pair out of that. Try something like "100 USD to EUR" or "GBP/USD".',
    };
  }

  const amount = match[1] ? Number(match[1]) : 1;
  const from = match[2].toUpperCase();
  const to = match[3].toUpperCase();
  const pair = `${from}/${to}`;

  const plan =
    `1. Read the pair as ${pair} with an amount of ${amount}.\n` +
    `2. Look ${pair} up in the fixed rate table (data/rates.json).\n` +
    `3. Multiply ${amount} by the rate.\n` +
    `4. Round to the decimals the table gives for ${to}, not to a fixed width.`;

  const toolCall = `lookupRate({ pair: "${pair}" })`;

  const entry = ratesTable.rates.find((row) => row.pair === pair);

  if (!entry) {
    return {
      plan,
      toolCall,
      toolResult: `null  // ${pair} is not in the table`,
      answer:
        `I do not have a rate for ${pair}. The table covers: ` +
        `${ratesTable.rates.map((row) => row.pair).join(", ")}.`,
    };
  }

  // The table decides the precision, not this file. JPY prints 0 decimals,
  // KWD prints 3, and most currencies print 2.
  const converted = (amount * entry.rate).toFixed(entry.decimals);

  return {
    plan,
    toolCall,
    toolResult: JSON.stringify(entry, null, 2),
    answer:
      `${amount} ${from} = ${converted} ${to} ` +
      `(rate ${entry.rate}, ${entry.decimals} decimals, as of ${ratesTable.as_of}).`,
  };
}

const LABELS: { key: keyof Trace; label: string }[] = [
  { key: "plan", label: "Plan" },
  { key: "toolCall", label: "Tool Call" },
  { key: "toolResult", label: "Tool Result" },
  { key: "answer", label: "Answer" },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [trace, setTrace] = useState<Trace | null>(null);

  // A question can also arrive in the URL as ?q=100+USD+to+EUR, which makes a
  // lookup linkable and reproducible.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("q");
    if (preset) {
      setQuestion(preset);
      setTrace(lookup(preset));
    }
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTrace(lookup(question));
  }

  return (
    <main>
      <h1>Currency Agent</h1>
      <p className="subtitle">
        Ask for a currency pair. Rates come from a fixed table, not a live feed.
      </p>

      <form className="ask" onSubmit={onSubmit}>
        <input
          type="text"
          name="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="e.g. 100 USD to EUR"
          aria-label="Question"
        />
        <button type="submit">Ask</button>
      </form>

      <div className="blocks">
        {LABELS.map(({ key, label }) => (
          <section className="block" key={key}>
            <h2>{label}</h2>
            {trace && trace[key] ? (
              <pre>{trace[key]}</pre>
            ) : (
              <p className="empty">Waiting for a question.</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
