# zk-Creator: Zero-Knowledge Content Paywall

**Built for the Midnight Builderathon (Wave 1)**

[![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod-blueviolet?style=for-the-badge&logo=shield)](https://midnight.network)
[![Compact Language](https://img.shields.io/badge/Smart%20Contracts-Compact%20v0.23-teal?style=for-the-badge)](https://docs.midnight.network)
[![Lace Wallet](https://img.shields.io/badge/Wallet-Lace%20(Midnight)-blue?style=for-the-badge)](https://www.lace.io/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=for-the-badge)](LICENSE)

> **zk-Creator** is a privacy-first Web3 decentralized application built on the **Midnight Network**. It allows creators to publish exclusive research, alpha reports, and digital goods behind a zero-knowledge paywall—enabling users to unlock and decrypt content locally without broadcasting their wallet address, financial balances, or on-chain identity to the public ledger.

---

## 🎯 The Problem

In today's Web3 ecosystem, "token-gated" content platforms (Discord bots, Mirror, Guild.xyz) suffer from a critical privacy flaw:
1. **Public Surveillance:** Unlocking gated content requires signing a message or making a transaction from a public wallet. This permanently links your real-world IP/identity to your on-chain financial portfolio.
2. **Whale Phishing & Tracking:** High-net-worth investors, security auditors, and VIPs frequently avoid token-gated alpha because interacting with the smart contract flags their wallet for tracking, targeted exploits, and spam.
3. **Identity Leaks for Sensitive Data:** Creators distributing sensitive research (e.g., zero-day vulnerability advisories, whistleblower leaks, or proprietary institutional research) have no way to verify qualified recipients without building a public list of everyone who accessed it.

---

## 🛡️ The Midnight Solution

zk-Creator solves this by utilizing **Compact Smart Contracts** on Midnight:

```
[User Browser + Lace Wallet]
       │
       ▼ (1) Private Secret Derivation (Local WebCrypto Witness)
  user_secret: Bytes<32>
       │
       ▼ (2) Local Client-Side Proving (Midnight Prover / SNARK)
  Computes: nullifier = persistentHash(user_secret)
  Asserts:  nullifier not in spent_nullifiers
       │
       ▼ (3) Disclose ONLY Nullifier Hash & ZK Proof (0 bytes identity)
[Midnight Preprod Ledger]
  ├── spent_nullifiers.insert(nullifier, true)  ✅ Prevents double-unlock
  └── total_unlocks.increment(1)                ✅ Creator gets verified count
       │
       ▼ (4) On-Chain Proof Verified
[Content Decrypted Locally in User's Browser]
```

### Key Innovations:
- **Zero Identity Disclosed:** The user's wallet address, token holdings, and private keys never leave their browser.
- **Nullifier Protection:** Midnight's `disclose(nullifier)` mechanism prevents replay attacks and double-spending while preserving total recipient anonymity.
- **Client-Side Proving:** Proving happens in the client environment, completely abstracting complex zkSNARK cryptography behind a clean user experience.

---

## 🏗️ Architecture & Compact Smart Contract

The core smart contract is written in Midnight's **Compact** domain-specific language ([`contracts/zk_creator.compact`](file:///c:/Users/karak/Downloads/midnight/zk-creator/contracts/zk_creator.compact)):

```rust
export ledger total_unlocks: Counter;
export ledger spent_nullifiers: Map<Bytes<32>, Boolean>;

export circuit unlock(user_secret: Bytes<32>): [] {
    // 1. Hash secret into a deterministic nullifier
    const nullifier = persistentHash<Bytes<32>>(user_secret);

    // 2. Disclose ONLY the nullifier to the public ledger
    const disclosed_nullifier = disclose(nullifier);

    // 3. Prevent double-claiming
    assert(!spent_nullifiers.member(disclosed_nullifier), 
           "This secret has already been used to unlock content");

    // 4. Update ledger state
    spent_nullifiers.insert(disclosed_nullifier, true);
    total_unlocks.increment(1);
}
```

### Rational Privacy Model:
| State Type | Data | Visibility |
| :--- | :--- | :--- |
| **Private Witness** | `user_secret` (Wallet seed/credential) | **Off-chain only** (Never leaves client browser) |
| **Public Ledger** | `spent_nullifiers` (32-byte hashes) | **On-chain public** (Guarantees unique unlock) |
| **Public Ledger** | `total_unlocks` (Counter) | **On-chain public** (Verifiable proof of creator traffic) |

---

## ⚡ Wave 1 Deliverables & Features Built

- [x] **Compact Circuit:** Implemented and compiled `zk_creator.compact` with deterministic nullifier hashing and standard library integration.
- [x] **Midnight DApp Connector API:** Integrated Lace wallet detection supporting `preprod`, `testnet`, and local environments with automatic network fallback.
- [x] **Local Witness Generation:** WebCrypto-powered SHA-256 deterministic witness derivation from the user's connected wallet and drop payload.
- [x] **Visual Proving Lifecycle:** Terminal-style UI displaying real-time cryptographic stages (Witness extraction, constraint synthesis, SNARK generation, and nullifier disclosure).
- [x] **Private Artifact Inspector:** Post-unlock modal showcasing the decrypted content alongside zero-knowledge metadata (`Circuit Hash`, `Nullifier Hash`, and `0 Bytes Identity Disclosed`).
- [x] **Preprod Deploy Tooling:** Full `@midnight-ntwrk/midnight-js` deployment pipeline configured with automatic wallet state generation, sync tracking, and faucet integration.

---

## 💻 Tech Stack

- **Zero-Knowledge Core:** Midnight Network, Compact Language (v0.23+), Midnight.js SDK
- **Frontend:** React 18, Vite, TypeScript
- **Styling & UI:** Tailwind CSS, PostCSS, Lucide Icons, Glassmorphism aesthetic
- **Wallet Support:** Lace Wallet (Midnight Edition)
- **Local Tooling:** Docker proof-server container, Nethermind Preprod indexer

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or v22 LTS
- **Browser Extension**: [Lace Wallet](https://www.lace.io/) set to **Midnight Preprod**
- **Docker Desktop**: (Optional, for running local proof-server)

### Installation & Run

1. **Clone & Install Dependencies:**
   ```bash
   git clone https://github.com/<your-username>/zk-creator.git
   cd zk-creator
   npm install
   ```

2. **Run the Frontend Application:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Deploy the Smart Contract to Midnight Preprod (CLI):**
   ```bash
   # 1. Start the proof server (Docker required)
   docker compose up -d proof-server

   # 2. Run the deployment script
   npm run deploy -- --network preprod
   ```
   *The deployment script syncs with the Preprod ledger, generates your deployer wallet, and prompts you to fund it via the Midnight faucet.*

---

## 🎬 Presentation & Demo Video Guide

See the full presentation script and demonstration walk-through in [`presentation_script.md`](presentation_script.md).

### Quick Demo Flow for Judges:
1. **Connect:** Click **Connect Lace Wallet** in the top right. App connects to Midnight Preprod.
2. **Select Drop:** Browse the curated creator drops (e.g. *Zero-Day Exploit Post-Mortem*).
3. **Synthesize Proof:** Click **Synthesize ZK Proof**. Watch the interactive proof terminal read private witness data and generate the SNARK.
4. **Inspect Artifact:** Click **View Private Artifact** to verify that the nullifier was registered on-chain while 0 bytes of identity were revealed.

---

## 👥 Builderathon Team

- Built for **Midnight Builderathon Wave 1**
- Exploring privacy-preserving monetization primitives for the decentralized web.
