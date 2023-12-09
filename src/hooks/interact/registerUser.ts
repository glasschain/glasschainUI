import { Contract, Provider, Signer } from "ethers";

import ABI from "./contractABI.json";

const contractAddress = "0x069ebabdbbed441b90cd662a78929e7e38820921";

async function registerUser(
  signerOrProvider: Signer | Provider,
  companyDomain: string
) {
  console.log("calling register usew");
  const contract = new Contract(contractAddress, ABI.abi, signerOrProvider);
  const tx = await contract.registerUser(companyDomain);
  console.log(tx);
}

export default registerUser;
