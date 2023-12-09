import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { uploadReview } from "../ipfs";

const contractAddress = "0x069ebabdbbed441b90cd662a78929e7e38820921";

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
