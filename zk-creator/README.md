# zk-Creator: Zero-Knowledge Paywall

> Unlock premium content without doxxing your wallet.

## Contract Address

| Network  | Address                                  |
|----------|------------------------------------------|
| Preview  | (Not deployed — local devnet used for presentation) |
| Local Dev| 418bcf105ea4633c9acadc7907904572ca467480ed123f4c5ac73716d42279a6 |

## What This Does

zk-Creator solves the Web3 privacy dilemma for token-gated content. It allows users to verify they hold required assets to unlock creator content locally, pushing only a cryptographic nullifier on-chain to prevent double-claiming and increment a public creator metric, preserving total user anonymity.

## Privacy Model

- **What is PUBLIC**: The list of spent nullifiers and the total count of content unlocks.
- **What is PRIVATE**: The user's underlying secret credential/wallet balance.
- **What the user PROVES without revealing**: They prove they hold a valid secret that has not yet been used to unlock this specific content.

### How It Works

```
User's Browser (Private)              Midnight Ledger (Public)
┌─────────────────────────┐            ┌─────────────────────────┐
│                         │            │                         │
│  user_secret ──hash()──►│──nullifier─►│  spent_nullifiers.insert│
│  (NEVER leaves client)  │  disclose()│  total_unlocks++        │
│                         │            │                         │
└─────────────────────────┘            └─────────────────────────┘
```

## Tech Stack

- **Midnight Network** — Privacy-first blockchain with dual-state model
- **Compact Language** — Zero-knowledge smart contract language
- **Node.js v22** — Runtime environment
- **Docker** — Proof server and local devnet

## Prerequisites

- Node.js v22 or later
- Docker running locally
- (For preview/preprod) Access to the [Midnight Faucet](https://faucet.midnight.network)

## Setup

```sh
# Clone the repository
git clone <this-repository-url>
cd zk-creator

# Install dependencies
npm install

# Start Docker containers (proof server + local devnet)
docker compose up -d --wait

# Compile the Compact contract
npm run compile

# Deploy the contract
npm run setup
# For preview network:
# npm run setup -- --network preview
```

## Run Tests

```sh
npm test
```

This runs 3 tests covering:
1. **Successful unlock** — Contract structure validates with unlock circuit and ledger decoder
2. **Duplicate rejection** — Nullifier lookup + assertion prevents double-claiming
3. **Privacy check** — Raw `user_secret` is never disclosed, only the hash (nullifier)

## Interact via CLI

```sh
npm run cli
```

The CLI provides:
1. **Unlock content** — Enter a 64-char hex secret to generate a ZK proof and unlock
2. **Check total unlocks** — Read the public counter from the blockchain
3. **Check wallet balance** — View tNight and DUST balances

## Initial Idea

The goal is to build a decentralized content paywall where creators can gate their premium digital content (e.g., articles, videos) and users can unlock it by proving they own a specific token or NFT. Critically, the user's public wallet address is never associated with their content consumption history on-chain.

## Screenshots

*(Add screenshots of your frontend application running locally here)*
