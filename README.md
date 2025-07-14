# NomadPass

NomadPass is a decentralized identity and financial access platform built on the Stellar blockchain. It empowers unbanked individuals including migrants, informal workers, and underserved communities to:

* ✅ Create and manage a verifiable digital identity on chain
* 💸 Receive payments, donations, and financial aid via a wallet linked to their identity
* 📜 Hold and share verifiable credentials such as educational or job certifications
* 🛡️ Access microloans and microinsurance services via Soroban smart contracts

---

## 🌍 Why NomadPass?

Billions of people globally remain excluded from the formal financial system due to lack of documentation, credit history, or digital infrastructure. NomadPass aims to break these barriers by offering:

* Self sovereign identity creation and verification
* Integrated wallet for Stellar-based payments and remittances
* Credential issuing for trusted third parties
* Access to decentralized financial services

---

## 🚀 Features

* **Decentralized Identity**
  Register and verify identity using a Soroban smart contract on Stellar Testnet.

* **Stellar Wallet Integration**
  Connect a wallet, receive funds, and view transaction history.

* **Verifiable Credentials**
  Add certifications or documents that can be verified by third parties.

* **Microcredit & Insurance Access (WIP)**
  Access decentralized financial tools based on identity and reputation.

---

## 📦 Tech Stack

* **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
* **Blockchain**: Stellar, Soroban smart contracts (Rust)
* **Wallet Integration**: Freighter wallet
* **Smart Contract Interaction**: Stellar CLI & Soroban SDK

---

## 📂 Project Structure

```
/app
  /create-identity     # Form to register and verify identity
  /credentials          # List and manage verifiable credentials
  /wallet               # View wallet address, receive funds, track transactions
  /microcredit          # (Coming soon) Access loans or insurance
  /help                 # Assistance and FAQ
/contracts
  identity_registry     # Soroban smart contract for identity storage
```

---

## 🧪 Running Locally

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build Soroban contract

```bash
stellar contract build
```

---

## Built for the Stellar LATAM Hackathon

NomadPass is being developed as part of the [Stellar LATAM Hackathon](https://stellar.org), targeting real-world financial and identity challenges in Latin America.
