"use client";

import React, { useState } from 'react';

// --- NEW: Define the props interface ---
interface CreateLinkFormProps {
  receiverEvmAddress?: `0x${string}`; // Use Wagmi's specific address type
  receiverSolAddress?: string;
}

export function CreateLinkForm({ receiverEvmAddress, receiverSolAddress }: CreateLinkFormProps) {
  // --- Form State (No Change) ---
  const [token, setToken] = useState('USDC');
  const [network, setNetwork] = useState('Polygon');
  const [amount, setAmount] = useState('');
  
  // --- NEW: State for the generated link ---
  const [generatedLink, setGeneratedLink] = useState('');

  // --- Handlers (No Change) ---
  const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToken(event.target.value);
  };
  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Basic regex for decimal numbers
       setAmount(value);
    }
  };

  // --- NEW: Link Generation Logic ---
  const handleGenerateLink = () => {
    let receiverAddress = '';
    
    // Check which network is selected and if the corresponding wallet is connected
    const isEvmNetwork = ['Polygon', 'Arbitrum', 'Base'].includes(network);
    const isSolNetwork = network === 'Solana';

    if (isEvmNetwork && receiverEvmAddress) {
      receiverAddress = receiverEvmAddress;
    } else if (isSolNetwork && receiverSolAddress) {
      receiverAddress = receiverSolAddress;
    } else {
      // Error: No wallet connected for the selected network
      alert(`Please connect a ${isEvmNetwork ? 'EVM' : 'Solana'} wallet to generate this link.`);
      return; // Stop
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Create the data object
    const paymentDetails = {
      to: receiverAddress,
      chain: network, // We'll need to map this to a chain ID later
      token: token,
      amount: amount,
    };

    // Encode the data for the URL
    // We use btoa (Base64) for a clean string that can go in a URL path
    const encodedData = btoa(JSON.stringify(paymentDetails))
      .replace(/\+/g, '-') // Make Base64 URL-safe
      .replace(/\//g, '_')
      .replace(/=+$/, ''); 

    // Create the final mock link
    const link = `/pay/${encodedData}`;
    setGeneratedLink(link);
  };

  return (
    <div className="w-full max-w-md">
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* --- Token Selection (No Change) --- */}
          <div className="mb-4">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Token to Receive
            </label>
            <select
              id="token"
              name="token"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={token}
              onChange={handleTokenChange}
            >
              <option>USDC</option>
              <option>ETH</option>
              <option>SOL</option>
            </select>
          </div>

          {/* --- Network Selection (No Change) --- */}
          <div className="mb-4">
            <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
              Receive on Network
            </label>
            <select
              id="network"
              name="network"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={network}
              onChange={handleNetworkChange}
            >
              <option>Polygon</option>
              <option>Solana</option>
              <option>Arbitrum</option>
              <option>Base</option>
            </select>
          </div>

          {/* --- Amount Input (No Change) --- */}
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="amount"
              name="amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 100"
              value={amount}
              onChange={handleAmountChange}
              min="0"
            />
          </div>

          {/* --- MODIFIED: Update Button --- */}
          <button
            type="button" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={!amount || parseFloat(amount) <= 0} // Basic validation
            onClick={handleGenerateLink} // <-- Call our new function
          >
            Generate Link
          </button>
        </form>
      </div>

      {/* --- NEW: Display the Generated Link --- */}
      {generatedLink && (
        <div className="mt-6 w-full p-4 bg-gray-100 rounded-lg shadow-inner">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your generated link:</label>
          <input
            type="text"
            readOnly
            // We need window.location.origin, which is only available in client components (which this is)
            value={`${typeof window !== "undefined" ? window.location.origin : ''}${generatedLink}`}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm"
          />
          <button
            onClick={() => {
              const fullLink = `${window.location.origin}${generatedLink}`;
              navigator.clipboard.writeText(fullLink);
              alert("Link copied to clipboard!"); // Simple feedback
            }}
            className="mt-2 w-full py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
      {/* ------------------------------------ */}
    </div>
  );
}