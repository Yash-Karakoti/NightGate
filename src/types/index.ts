export type DropCategory = "Airdrop Alpha" | "Audits & Exploits" | "Institutional DeFi";

export type ContentItem = {
  id: string;
  creator: string;
  avatar: string;
  title: string;
  category: DropCategory;
  requirement: string;
  teaser: string;
  secretContent: string;
  unlocks: number;
  published: string;
  accent: "cyan" | "indigo" | "emerald" | "amber";
};

export type WalletState = {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string;
};

export type ProofStep = "idle" | "reading" | "synthesizing" | "proving" | "disclosing" | "success";

export type ProofState = {
  step: ProofStep;
  progress: number;
  nullifier: string;
};