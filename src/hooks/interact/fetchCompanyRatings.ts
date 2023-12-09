import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";

const contractAddress = "0x069ebabdbbed441b90cd662a78929e7e38820921";

async function fetchCompanyRatings(
  signerOrProvider: Signer | Provider,
  companyDomain: string
): Promise<{
  companyRating: number[][];
  ratingHashes: string[];
}> {
  console.log("calling fetch companies");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.fetchCompanyRatings(companyDomain);
  const entries = tx.toString().split(",");
  const ratings = entries.slice(0, (entries.length * 5) / 6);
  const hashes = entries.slice((entries.length * 5) / 6, entries.length);

  const commentIds: string[] = [];
  const compRatings: number[][] = [];
  for (let i = 0; i < hashes.length; i++) {
    if (hashes[i] === "") {
      continue;
    }
    commentIds.push(hashes[i]);
    const rating: number[] = [];
    for (let j = 0; j < 5; j++) {
      rating.push(parseInt(ratings[i * 5 + j]));
    }
    compRatings.push(rating);
  }
  console.log(compRatings, commentIds);
  return {
    companyRating: compRatings,
    ratingHashes: commentIds,
  };
}

export default fetchCompanyRatings;
