import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { uploadCompanyData } from "../ipfs";

const contractAddress = "0x44eb54695b4830e0fc02162b22cdee067bdd80b2";

async function registerCompany(
  signerOrProvider: Signer | Provider,
  companyName: string,
  companyDomain: string,
  companyDesc: string
) {
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);

  const ipfsData = await uploadCompanyData(companyName, companyDesc);
  console.log(ipfsData);
  const tx = await contract.registerCompany(
    companyName,
    ipfsData.Hash,
    companyDomain
  );
  console.log(tx);
}

export default registerCompany;
