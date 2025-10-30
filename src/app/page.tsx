// src/app/page.tsx
"use client"; 

import { CreateLinkForm } from '@/components/CreateLinkForm';
import { useAccount } from 'wagmi'; 
import { useWallet } from '@solana/wallet-adapter-react'; 
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 
import { useState, useEffect } from 'react'; // <-- IMPORT useState and useEffect

export default function Home() {
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount(); 
  const { publicKey: solPublicKey, connected: isSolConnected } = useWallet(); 

  // --- Fix for Hydration Error ---
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code only runs on the client, after the component has mounted
    setIsClient(true);
  }, []); // The empty array [] means this effect runs once on mount
  // -----------------------------

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50">
      
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">OmniPay Link</h1>
        
        {/* We add a fixed height to the container to prevent layout shift */}
        <div className="flex space-x-4 h-[40px]"> {/* Use a fixed height (e.g., h-10 or 40px) */}

          {/* Only render wallet buttons if we are on the client */}
          {isClient ? (
            <>
              {/* Web3Modal EVM Button */}
              <w3m-button />

              {/* Solana Connect/Disconnect Button */}
              <WalletMultiButton />
            </>
          ) : (
            /* Render simple placeholders of the same size to prevent layout jump */
            <>
              <div className="bg-gray-200 rounded-lg animate-pulse" style={{ height: '40px', width: '150px' }} />
              <div className="bg-gray-200 rounded-lg animate-pulse" style={{ height: '40px', width: '150px' }} />
            </>
          )}

        </div>
      </div>
      
      {/* The status display should also be client-aware to be safe */}
      <div className="w-full max-w-md mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm min-h-[76px]">
        {/* Only render the status *after* client mount */}
        {isClient ? (
          <>
            <p>
              <span className="font-medium">EVM Status:</span> {isEvmConnected ? `Connected (${evmAddress?.substring(0, 6)}...${evmAddress?.substring(evmAddress.length - 4)})` : 'Not Connected'}
            </p>
            <p>
              <span className="font-medium">Solana Status:</span> {isSolConnected && solPublicKey ? `Connected (${solPublicKey.toBase58().substring(0, 4)}...${solPublicKey.toBase58().substring(solPublicKey.toBase58().length - 4)})` : 'Not Connected'}
            </p>
          </>
        ) : (
          /* Show a loading state to match the server render */
          <>
            <p><span className="font-medium">EVM Status:</span> Loading...</p>
            <p><span className="font-medium">Solana Status:</span> Loading...</p>
          </>
        )}
      </div>

      <CreateLinkForm />
    </main>
  );
}