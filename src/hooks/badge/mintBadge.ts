import { Contract, Provider, Signer, keccak256 } from "ethers";
import ABI from "./nftABI.json";

const nftAdress = "0x4721c2e91970c47ad85bee2fe34e34c359268329";

export default async function mintBadge(
  signerOrProvider: Signer | Provider,
  companyDomain: string,
  username: string
) {
  console.log("calling mintBadge", companyDomain, username);
  const contract = new Contract(nftAdress, ABI.abi, signerOrProvider);
  const Hash = keccak256(username);
  const tx = await contract.safeMint(companyDomain, Hash);
  console.log(tx);
}
