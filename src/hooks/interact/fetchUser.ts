import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";

const contractAddress = "0xc875e91dfd98040a86d0126f1e12d7eb8ea9d985";

async function fetchUser(signerOrProvider: Signer | Provider): Promise<{
  domain: string;
  ratingHashes: string[];
}> {
  console.log("calling fetchUser");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.fetchUser();
  const entries = tx.toString().split(",");
  if (entries[0] === "") {
    return {
      domain: "",
      ratingHashes: [],
    };
  }
  console.log(entries);
  const domain = entries[0];
  const ratingHashes = entries.slice(1);
  console.log(domain, ratingHashes);
  return {
    domain: domain,
    ratingHashes: ratingHashes,
  };
}

export default fetchUser;
