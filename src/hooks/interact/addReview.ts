import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { uploadReview } from "../ipfs";

const contractAddress = "0x44eb54695b4830e0fc02162b22cdee067bdd80b2";

async function addReview(
  signerOrProvider: Signer | Provider,
  companyDomain: string,
  rating: number,
  comment: string
) {
  console.log("calling addReview");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const ipfsData = await uploadReview(comment);
  const tx = await contract.addReview(rating, companyDomain, ipfsData.Hash);
  console.log(tx);
}

export default addReview;
