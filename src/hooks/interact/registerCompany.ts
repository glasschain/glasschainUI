import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { uploadCompanyData } from "../ipfs";

const contractAddress = "0xc875e91dfd98040a86d0126f1e12d7eb8ea9d985";

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
