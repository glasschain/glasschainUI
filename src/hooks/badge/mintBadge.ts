import { Contract, Provider, Signer, keccak256, toUtf8Bytes } from "ethers";
import ABI from "./nftABI.json";

const nftAdress = "0xdb7891c555a74afbbd5c8a7402eb6a613571b7f2";

export default async function mintBadge(
  signerOrProvider: Signer | Provider,
  companyDomain: string,
  username: string
) {
  console.log("calling mintBadge", companyDomain, username);
  const contract = new Contract(nftAdress, ABI.abi, signerOrProvider);
  const Hash = keccak256(toUtf8Bytes(username));
  const tx = await contract.safeMint(companyDomain, Hash);
  console.log(tx);
}
