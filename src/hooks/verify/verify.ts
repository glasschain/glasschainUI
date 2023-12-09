import { rawEmailToBuffer } from "@zk-email/helpers/src/input-helpers";
import { DKIMVerificationResult, verifyDKIMSignature } from "@zk-email/helpers/src/dkim";
import { generateDomainVerifierCircuitInputs } from "./emlVerifierCircuit";

async function genProof(email : string, address: string) {
    const emailBuffer = rawEmailToBuffer(email);

    let dkimResult: DKIMVerificationResult;
    try {
        dkimResult = await verifyDKIMSignature(emailBuffer);
    } catch (e) {
        console.log("Error verifying DKIM", e);
        return;
    }

    let input: ICircuitInputs;
    try {
        input = await generateDomainVerifierCircuitInputs({
            rsaSignature: dkimResult.signature,
            rsaPublicKey: dkimResult.publicKey,
            body: dkimResult.body,
            bodyHash: dkimResult.bodyHash,
            message: dkimResult.message,
            address,
        })

        console.log("Generated input:", JSON.stringify(input));
    } catch (e) {
        console.log("Error generating input", e);
        return;
    }

    return proof;
}