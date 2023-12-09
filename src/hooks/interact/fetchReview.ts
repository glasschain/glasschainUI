import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { getReview } from "../ipfs";

const contractAddress = "0x069ebabdbbed441b90cd662a78929e7e38820921";

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
  console.log(entries);
  const rating = parseInt(entries[0]);
  const comment = await getReview(entries[2]);
  const domain = entries[1];
  console.log(rating, comment);
  return {
    rating: rating,
    comment: comment,
    domain: domain,
  };
}

export default fetchReview;
