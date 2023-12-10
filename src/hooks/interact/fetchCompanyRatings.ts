import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";

const contractAddress = "0xc875e91dfd98040a86d0126f1e12d7eb8ea9d985";

async function fetchCompanyRatings(
  signerOrProvider: Signer | Provider,
  companyDomain: string
): Promise<{
  companyRating: number[];
  ratingHashes: string[];
}> {
  console.log("calling fetch companies");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.fetchCompanyRatings(companyDomain);
  const entries = tx.toString().split(",");

  const commentIds: string[] = [];
  const compRatings: number[] = [0, 0, 0, 0, 0];

  if (entries.length < 5) {
    return {
      companyRating: compRatings,
      ratingHashes: commentIds,
    };
  }
  const ratings = entries.slice(0, 5);
  const hashes = entries.slice(5, entries.length);

  for (let i = 0; i < 5; i++) {
    if (ratings[i] !== "") {
      compRatings[i] = parseInt(ratings[i]);
    }
  }

  for (let i = 0; i < hashes.length; i++) {
    if (hashes[i] === "") {
      continue;
    }
    commentIds.push(hashes[i]);
  }
  console.log(compRatings, commentIds);
  return {
    companyRating: compRatings,
    ratingHashes: commentIds,
  };
}

export default fetchCompanyRatings;
