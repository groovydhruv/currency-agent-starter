import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The scaffold instruction ruled out extra generated files; this stops Next
  // from re-creating AGENTS.md and CLAUDE.md on every dev run.
  agentRules: false,
};

export default nextConfig;
