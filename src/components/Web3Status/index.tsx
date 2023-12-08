import { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";

import wallet from "../../assets/wallet.png";

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ConnectWallet = styled.button`
  font-family: sans-serif;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  background: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 24px;
`;

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Web3Status() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (window && window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  let provider;
  async function connect() {
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider(
        "https://eth-goerli.api.onfinality.io/public"
      );
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum);
      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      const signerValue = await provider.getSigner();
      setSigner(signerValue);
      setIsConnected(true);
    }
  }
  const address = signer?.address;
  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;
  // const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected && address ? (
        <ConnectWallet>{isConnected && addressShort}</ConnectWallet>
      ) : (
        <ConnectWalletWrapper onClick={() => connect()}>
          <img
            height={"38px"}
            width={"44px"}
            style={{ marginLeft: "24px" }}
            src={wallet}
            alt="logo"
          />
          <ConnectWallet>Connect</ConnectWallet>
        </ConnectWalletWrapper>
      )}
    </div>
  );
}
