"use client";
import React , {useState} from 'react';

export function CreateLinkForm(){
    
const [token,setToken] = useState("USDC");
const [network,setNetwork] = useState("Polygon");
const [amount,setAmount] = useState("");
const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToken(event.target.value);
};
const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value);
};
const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setAmount(value);
    }
};
    return(
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <form onSubmit={(e)=>e.preventDefault()}>
                <div className ="mb-4">
                    <label htmlFor ="token" className = "block text-sm font-medium text-gray-700 mb-1">
                        Token to Receive
                    </label>
                    <select id = "token" name="token" className = "mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={token} onChange={handleTokenChange}>
                        <option>USDC</option>
                        <option>ETH</option>
                        <option>SOL</option>
                    </select>

                </div>
                <div className ="mb-4">
                    <label htmlFor= "network" className = "block text-sm font-medium text-gray-700 mb-1">
                        Recieve on Network
                    </label>
                    <select id = "network" name="network" className = "mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={network} onChange={handleNetworkChange}>
                        <option>Polygon</option>
                        <option>Solana</option>
                        <option>Arbitrum</option>
                        <option>Base</option>

                    </select>
                </div>
                <div className ="mb-6">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                    </label>
                    <input
                        type="text"
                        inputMode ="decimal"
                        id="amount"
                        name="amount"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder = "e.g.,100"
                        value={amount}
                        onChange={handleAmountChange}
                        step ="any"
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    onClick={() => console.log({ token, network, amount })}
                >
                    Generate Link (WIP)
                </button>
            </form>
        </div>
    );
}