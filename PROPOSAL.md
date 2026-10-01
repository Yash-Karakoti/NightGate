# NightGate — Product Proposal

**Submitted for:** Midnight Builderathon — Rise In, Step 3  
**Category:** Confidential Credentials / Private Allowlist Access  
**Team:** Yash Karakoti  
**Repository:** [Yash-Karakoti/NightGate](https://github.com/Yash-Karakoti/NightGate)  
**Live Demo:** [nightgate.netlify.app](https://nightgate.netlify.app)  
**Demo Video:** [https://youtu.be/CK3zBFsSE8Q](https://youtu.be/CK3zBFsSE8Q)

---

## 1. What are you building, and what problem does it solve?

**NightGate** is a zero-knowledge content paywall built on the Midnight Network. It allows creators to publish exclusive content (research, alpha reports, digital goods) behind a privacy-preserving paywall — enabling users to unlock and decrypt content **without revealing their wallet address, financial balances, or on-chain identity** to the public ledger.

### The Problem

Existing "token-gated" content platforms (Discord bots, Mirror, Guild.xyz) suffer from a critical privacy flaw: unlocking gated content requires signing a message or making a transaction from a public wallet. This permanently links the user's real-world identity to their on-chain financial portfolio and reading habits. High-net-worth investors, security auditors, and VIPs frequently avoid token-gated content because interacting with a public smart contract flags their wallet for tracking, phishing, and spam.

### Our Solution

NightGate flips the model. Instead of a public smart contract verifying a user's balance on-chain, NightGate uses **Compact smart contracts** and **local ZK proving** on the Midnight Network. When a user requests content access, their browser generates a zero-knowledge proof that states: *"I mathematically hold a valid, unused credential — but I will not tell you who I am."* Only a one-way nullifier hash is disclosed on-chain, preventing double-claiming while preserving total anonymity.

---

## 2. How does your project use Midnight's technology (Compact language, MidnightJS, ZK proofs)?

### Compact Smart Contract

The core logic is written in Midnight's **Compact** language (v0.23+). The contract defines:

- **Public ledger state:** `total_unlocks: Counter` and `spent_nullifiers: Map<Bytes<32>, Boolean>`
- **Private witness input:** `user_secret: Bytes<32>` — never leaves the user's browser

The `unlock` circuit:
1. Accepts `user_secret` as a **private witness** (never broadcast)
2. Hashes it via `persistentHash()` to derive a deterministic **nullifier**
3. Calls `disclose(nullifier)` — making **only** the hash public on-chain
4. Asserts the nullifier is not in `spent_nullifiers` (preventing double-use)
5. Records the nullifier and increments `total_unlocks`

### MidnightJS SDK Integration

The frontend uses the full **Midnight.js SDK** stack:
- `DApp Connector API` → Lace wallet connect (`preprod` network)
- `initializeProviders()` builds complete `MidnightProviders` (indexer, proof server, ZK config, private state, wallet, submission)
- `findDeployedContract()` locates the deployed contract on Preprod
- `contract.callTx.unlock(userSecret)` triggers local ZK proof generation → balance tx → submit to Preprod

### Zero-Knowledge Proof Flow

All ZK proving happens **client-side** in the user's browser. The user's `user_secret` is never transmitted over the network. The browser synthesizes a zkSNARK proof locally, and only the nullifier hash + proof are submitted to the Midnight ledger. An observer can see that a valid unlock occurred, but cannot determine *who* performed it.

---

## 3. How do users interact with your project? Describe the UX and how the privacy mechanism is surfaced.

### User Flow

1. **Connect Wallet:** Users click "Connect Wallet" to link their Lace Wallet extension (connected to Midnight Preprod).
2. **Browse Content:** The dashboard displays available gated content with clear privacy indicators.
3. **Unlock Content:** Clicking "Unlock" triggers the ZK proving flow:
   - A **ProofProgressModal** displays real-time cryptographic stages in a terminal-style UI (witness extraction, constraint synthesis, SNARK generation) — making the privacy mechanism transparent and educational.
4. **View Content:** Upon successful proof verification, the content is decrypted locally.
5. **Inspect Privacy Artifacts:** A **PrivacyInspector** panel shows ZK metadata post-unlock — the circuit hash, nullifier hash, and the fact that **0 bytes** of identity were disclosed.

### Privacy UX Design

The privacy mechanism is not hidden from users — it's a **first-class UX element**:
- The `ProofProgressModal` educates users about what's happening during proof generation
- The `PrivacyInspector` component explicitly shows what data was disclosed (nullifier hash) vs. what was kept private (wallet address, secret, balance)
- Visual badges throughout the UI reinforce the zero-knowledge guarantee

---

## 4. How can someone run, test, and verify your project?

### Prerequisites

- Node.js v22 or later
- Lace Wallet browser extension (for live demo interaction)
- Git

### Running Locally

```bash
# Clone the repository
git clone https://github.com/Yash-Karakoti/NightGate.git
cd NightGate

# Install frontend dependencies
npm install

# Run the frontend locally
npm run dev
```

### Smart Contract (Compile & Deploy)

```bash
cd zk-creator

# Install contract dependencies
npm install

# Compile the Compact contract (requires compact compiler)
npm run compile

# Deploy to Preprod (requires funded wallet via Midnight Faucet)
npm run deploy -- --network preprod
```

### Running the Test Suite

The test suite covers three critical areas: **circuit correctness**, **state transition/duplicate rejection**, and **privacy guarantees**.

```bash
cd zk-creator

# Run all contract tests
npm test
```

**Test 1 — Circuit & Contract Structure:** Validates that the compiled contract exports the correct constructor, ledger decoder, and `unlock` circuit (both `impureCircuits` and `provableCircuits`).

**Test 2 — State Transition & Duplicate Rejection:** Verifies the Compact source contains the correct nullifier membership check (`.member()`), assertion (`assert()`), and insertion (`.insert()`) in the correct logical order — ensuring double-claiming is impossible.

**Test 3 — Privacy Guarantee:** Confirms that `disclose()` is called **only** on the nullifier hash (never on `user_secret`), that `persistentHash()` is applied before any disclosure, and that the exported ledger fields never contain raw secrets.

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration:
- **Compact Compile Verification:** Validates the contract compiles correctly
- **Contract Tests:** Runs all three tests (circuit, state, privacy)
- **Frontend Build:** Type-checks and builds the production frontend

[![CI Pipeline](https://github.com/Yash-Karakoti/NightGate/actions/workflows/ci.yml/badge.svg)](https://github.com/Yash-Karakoti/NightGate/actions/workflows/ci.yml)

### Deployed Contract

**Preprod Contract Address:** `d9feb2468cb2325da4bb6709d5b278631d3f113fda43265a032d21db4cb066db`

### Live Demo

**URL:** [https://nightgate.netlify.app](https://nightgate.netlify.app)  
*(Requires Lace Wallet extension connected to Midnight Preprod network)*
