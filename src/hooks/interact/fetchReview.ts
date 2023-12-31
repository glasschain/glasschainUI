import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { getReview } from "../ipfs";

const contractAddress = "0x44eb54695b4830e0fc02162b22cdee067bdd80b2";

async function fetchReview(
  signerOrProvider: Signer | Provider,
  reviewId: string
): Promise<{
  rating: number;
  comment: string;
  domain: string;
}> {
  console.log("calling fetchReview");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.fetchRating(reviewId);
  const entries = tx.toString().split(",");
  if (entries.length !== 4 || entries[0] === "") {
    return {
      rating: 0,
      comment: "",
      domain: "",
    };
  }
  const rating = parseInt(entries[0]);
  const comment = await getReview(entries[2]);
  const domain = entries[1];
  return {
    rating: rating,
    comment: comment,
    domain: domain,
  };
}

export default fetchReview;
