"use client";

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import React, { useMemo } from 'react'; // <-- Make sure useMemo is imported
import { arbitrum, base, mainnet, optimism, polygon } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ... all other imports (Wagmi, Web3Modal, Solana, QueryClient) ...

// --- Styles (Move this to layout.tsx if you haven't yet) ---
// require('@solana/wallet-adapter-react-ui/styles.css'); 
// (Make sure this import is in layout.tsx as we discussed)

// --- Web3Modal Project ID ---
const projectId = 'f873cadf813d8e3bc3530decb4f44114'; // <-- PASTE YOUR WALLETCONNECT PROJECT ID HERE

// --- Wagmi / Web3Modal Setup (This is NOT hook-based, so it stays outside) ---
const metadata = {
  name: 'OmniPay Link',
  description: 'Simple Cross-Chain Crypto Payments',
  url: 'http://localhost:3000',
  icons: ['']
};
const chains = [mainnet, polygon, arbitrum, base, optimism] as const;
const queryClient = new QueryClient();
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});
createWeb3Modal({ wagmiConfig, projectId });


// --- Main Provider Component ---
export function Web3Provider({ children }: { children: React.ReactNode }) {

  // --- Solana Setup (Move Hook-based logic INSIDE the component) ---
  const solNetwork = WalletAdapterNetwork.Devnet; // Or Mainnet
  
  // ✅ VALID HOOK CALLS (inside the component)
  const solEndpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  const solWallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network: solNetwork }),
    ],
    [solNetwork]
  );
  // -------------------------------------------------------------

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={solEndpoint}>
          {/* Pass the memoized wallets to the provider */}
          <WalletProvider wallets={solWallets} autoConnect>
            <WalletModalProvider>
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}