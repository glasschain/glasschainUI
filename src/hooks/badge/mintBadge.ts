import { Contract, Provider, Signer, keccak256, toUtf8Bytes } from "ethers";
import ABI from "./nftABI.json";

const nftAdress = "0xdc8af91ad20a2c1eacc37842083939ca5c1e46e0";

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
