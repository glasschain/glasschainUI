import { Contract, Provider, Signer } from "ethers";
// import { PushAPI, CONSTANTS, SignerType } from "@pushprotocol/restapi";

import ABI from "./contractABI.json";

// const pushChannelAddress = "0xE4e23038A582E5c6F7F1a1345D22560E9AdecF54";
const contractAddress = "0xc875e91dfd98040a86d0126f1e12d7eb8ea9d985";
// const pk = "8c2384d17cfa9fda40a1340de57e05df266d971728b8419a7a802813c6a792e7";

async function registerUser(
  signerOrProvider: Signer | Provider,
  companyDomain: string
) {
  console.log("calling register usew");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.registerUser(companyDomain);
  // const signer = ethers.Wallet.createRandom();
  // const userAlice = await PushAPI.initialize(signer, { env : CONSTANTS.ENV.STAGING });
  console.log(tx);
}

export default registerUser;
