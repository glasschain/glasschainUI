import React, { createContext, useContext, useState } from "react";

export const Web3Context = createContext({});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [companyDetails, setCompanyDetails] = useState();

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        hasMetamask,
        signer,
        companyDetails,
        setIsConnected,
        setHasMetamask,
        setSigner,
        setCompanyDetails,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3Context = () => useContext(Web3Context);
