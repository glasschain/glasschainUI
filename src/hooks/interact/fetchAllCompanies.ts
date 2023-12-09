import { Contract, Provider, Signer } from "ethers";

import { getCompanyData } from "../ipfs";

import ABI from "./contractABI.json";

const contractAddress = "0x069ebabdbbed441b90cd662a78929e7e38820921";

async function fetchAllCompanies(signerOrProvider: Signer | Provider): Promise<{
  companyDomain: string[];
  companyName: string[];
  companyDesc: string[];
}> {
  console.log("calling fetch companies");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.fetchAllCompanies();
  const entries = tx.toString().split(",");
  const ipfsCompanyHashes = entries.slice(
    entries.length / 3,
    (entries.length * 2) / 3
  );
  const companyDomains = entries.slice(
    (entries.length * 2) / 3,
    entries.length
  );
  const companyNames: string[] = [];
  const companyDescs: string[] = [];
  const companyDomains2: string[] = [];
  for (let i = 0; i < ipfsCompanyHashes.length; i++) {
    if (ipfsCompanyHashes[i] === "" && companyDomains[i] === "") {
      continue;
    }
    const { companyName, companyDescription } = await getCompanyData(
      ipfsCompanyHashes[i]
    );
    companyDomains2.push(companyDomains[i]);
    companyNames.push(companyName);
    companyDescs.push(companyDescription);
  }
  return {
    companyDomain: companyDomains2,
    companyName: companyNames,
    companyDesc: companyDescs,
  };
}

export default fetchAllCompanies;
