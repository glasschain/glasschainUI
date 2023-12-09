import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";
import { uploadCompanyData } from "../ipfs";

const contractAddress = "0xe2d62acfb6054268b74311fb159e07faad3c15e5";

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
