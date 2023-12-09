import {Contract, Provider, Signer } from 'ethers';

import ABI from './contractABI.json';

const contractAddress = "0xe2d62acfb6054268b74311fb159e07faad3c15e5";

async function registerUser(signerOrProvider: Signer | Provider, companyDomain: string) {
    const contract = new Contract(contractAddress,  ABI.abi, signerOrProvider);
    const tx = await contract.registerUser(companyDomain);
    console.log(tx);
}

export default registerUser;