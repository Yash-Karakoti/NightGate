import type { ContentItem } from "@/types";

export const mockDrops: ContentItem[] = [
  {
    id: "midnight-grant-rubric",
    creator: "@ZK_Insider",
    avatar: "ZI",
    title: "2026 Midnight Foundation Grant Program: Internal Scoring Rubric",
    category: "Institutional DeFi",
    requirement: "Hold > 100 tNIGHT",
    teaser: "A private scoring matrix reveals which infrastructure proposals are being fast-tracked for the next builder cohort...",
    secretContent:
      "Priority tracks: privacy-preserving identity, wallet UX, and developer tooling. Interview focus: explain your nullifier model, show a credible path to mainnet usage, and quantify who benefits from the proof system.",
    unlocks: 128,
    published: "12 min ago",
    accent: "indigo",
  },
  {
    id: "nullifier-reentrancy",
    creator: "@SecAlliance_Audits",
    avatar: "SA",
    title: "Zero-Day Exploit Post-Mortem & Mitigation Script",
    category: "Audits & Exploits",
    requirement: "Verified Auditor Credential",
    teaser: "The cross-contract nullifier reentrancy bug was smaller than expected — and much more dangerous in composable flows...",
    secretContent:
      "Mitigation: lock the nullifier before external calls, replay-check the witness commitment, and keep proof verification atomic. Patch references include raw Rust and Compact snippets for the vulnerable call path.",
    unlocks: 76,
    published: "34 min ago",
    accent: "emerald",
  },
  {
    id: "cardano-midnight-bridge",
    creator: "@StakePool_Prime",
    avatar: "SP",
    title: "Cardano × Midnight Interoperability Alpha Deck",
    category: "Airdrop Alpha",
    requirement: "Midnight Testnet Participant",
    teaser: "A private RPC map, bridge contract shortlist, and early liquidity playbook for the first interoperability wave...",
    secretContent:
      "The highest-conviction route is a staged liquidity bootstrapping pool paired with a proof-gated bridge adapter. The deck includes RPC notes, contract addresses, and a three-week deployment sequence.",
    unlocks: 204,
    published: "1 hr ago",
    accent: "cyan",
  },
  {
    id: "airdrop-signal-map",
    creator: "@0xWhaleWhisperer",
    avatar: "WW",
    title: "Tier-1 CEX Listing & Airdrop Matrix Q4 2026",
    category: "Airdrop Alpha",
    requirement: "Hold > 500 tNIGHT or Verified Human Credential",
    teaser: "Anonymized wallet clusters point to a clean sequence of ecosystem quests before the next major liquidity event...",
    secretContent:
      "The signal map prioritizes proof-of-participation actions over capital size. Start with devnet interactions, keep activity human-paced, and preserve a clean witness trail for future claims.",
    unlocks: 42,
    published: "2 hrs ago",
    accent: "amber",
  },
];