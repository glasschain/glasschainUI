import { Contract, Provider, Signer } from "ethers";
import ABI from "./nftABI.json";

const nftAdress = "0x9b15927eba5f9fc50b093c8956f5f0240efad9c9";

export default async function mintBadge(
  signerOrProvider: Signer | Provider,
  to: string,
  tokenId: number
) {
  const contract = new Contract(nftAdress, ABI.abi, signerOrProvider);
  const tx = await contract.mintBadge(to, tokenId);
  console.log(tx);
}
