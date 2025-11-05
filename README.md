# 🪙 OmniPay Link

**OmniPay Link** is a "UPI for Web3" project that simplifies cross-chain crypto payments. It allows you to create a simple, shareable link to receive a specific asset (like 20 USDC on Polygon), and lets the sender pay with *any* asset from *any* supported chain (like ETH on Arbitrum).

This project is currently in the MVP development phase, built using Next.js, Wagmi, Solana Wallet Adapter, and the LI.FI SDK.

## 😫 The Problem

The current crypto payment experience is a **high-friction, high-anxiety nightmare.**

If a freelancer wants to get paid 20 USDC on Polygon:
1.  **Client Friction:** Their client might only have ETH on Base. This forces the client into a complex, 10-minute "mini-project" of finding a bridge, swapping, paying gas on multiple chains, and praying they don't send the funds to the wrong network.
2.  **"Wrong Network" Fear:** Sending funds to the wrong address or chain often results in **permanent loss**.
3.  **"Gas Token Hell":** Senders are forced to own multiple gas tokens (MATIC, ETH, SOL, etc.) just to make payments.
4.  **Result:** Users abandon the payment, and crypto adoption for real-world use cases (like freelancing and remittances) stalls.

## ✨ The Solution 

OmniPay Link abstracts all this complexity away behind a single, simple link.

1.  **Receiver (Phase 1):**
    * Connects their wallet (EVM or Solana).
    * Fills out a simple form: "I want **20 USDC** on **Polygon**."
    * The app generates a simple, shareable link: `https(://...) /pay/ey...`

2.  **Sender (Phase 2):**
    * Clicks the link and sees the payment request.
    * Connects *their* wallet (e.g., MetaMask on Arbitrum).
    * Our app uses the **LI.FI SDK** to find the best route and shows a single quote: **"You Pay: 0.0... ETH"**
    * The sender approves **one transaction.**
## 🛣️ Project Roadmap (Next Steps)

* **Phase 2 (WIP):**
    * [ ] **Transaction Execution:** Call the `executeRoute` function from the LI.FI SDK.
    * [ ] **Signer Management:** Pass the correct `wagmi` or `use-solana` signer to the SDK.
* **Phase 3 (MVP Polish):**
    * [ ] **QR Code Generation:** Add a QR code button next to the generated link for easy mobile sharing.
    * [ ] **Dynamic "Pay With" Token:** Allow the sender to choose *which* of their tokens to pay with, not just the native asset.
    * [ ] **Robust Token/Chain Lists:** Fetch supported tokens/chains from the LI.FI API instead of our hardcoded maps.
* **Phase 4 (Future):**
    * [ ] **Gas Abstraction:** Investigate paying for the sender's gas fee with the `fromToken`.
    * [ ] **User Accounts:** Allow receivers to save and manage their payment links.
    
## 🚀 Core Features (MVP)

* **Dual-Wallet Receiver:** Connect both EVM (Web3Modal) and Solana wallets on the homepage.
* **Shareable Payment Links:** Generate a URL-safe, Base64-encoded link containing payment details.
* **Dynamic Payment Page:** A sender-facing page that decodes the link and displays the request.
* **Dual-Wallet Sender:** Senders can connect *their* EVM or Solana wallets to pay.
* **Cross-Chain Quote Engine:** Integrates the LI.FI SDK to fetch real-time quotes for "any-to-any" cross-chain payments.

## 🛠️ Tech Stack

* **Framework:** Next.js 14+ (App Router) with Turbopack
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **EVM Wallets:** `wagmi`, `viem`, `@web3modal/wagmi`
* **Solana Wallets:** `@solana/wallet-adapter-react`, `@solana/wallet-adapter-wallets`
* **Core Logic:** `@lifi/sdk` (for bridge & DEX aggregation)
* **Utilities:** `ethers.js` (for amount formatting)

## 🏁 Getting Started

### 1. Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A Web3Modal (WalletConnect) Project ID.

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/omnipav-link-app.git](https://github.com/your-username/omnipav-link-app.git)
    cd omnipav-link-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### 3. Environment Setup

1.  Create a new file in the root of the project named `.env.local`.
2.  Get your **Project ID** from [WalletConnect Cloud](https://cloud.walletconnect.com/).
3.  Add it to the `.env.local` file. This ID is needed for Web3Modal to work.

    ```
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="YOUR_PROJECT_ID_HERE"
    ```
    *(Note: You'll also need to update this variable's name in `src/components/Web3Provider.tsx`)*

### 4. Run the Development Server

```bash
npm run dev
