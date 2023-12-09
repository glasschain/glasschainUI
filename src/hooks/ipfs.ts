import lighthouse from '@lighthouse-web3/sdk'

const apiKey = "07a6023c.4f10b2fcd88d41018db96c3760db0706"

async function uploadReview(comment: string) {
    const storeResp = await lighthouse.uploadText(comment, apiKey)
    console.log(storeResp)
    return storeResp.data
}

async function uploadCompanyData(companyName: string, companyDescription: string) {
    const compJson = { 
        name: companyName,
        description: companyDescription
    }
    const storeResp = await lighthouse.uploadText(JSON.stringify(compJson), apiKey)
    console.log(storeResp)
    return storeResp.data
}


async function getReview(commentHash: string) {
    try {
        const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${commentHash}/`);

        if (!response.ok) {
            throw new Error(`Failed to fetch review. Status: ${response.status}`);
        }

        const comment = await response.text();
        console.log(comment);
        return comment;
    } catch (error) {
        console.error("Error fetching review:", error);
        throw error; // Re-throw the error for the calling code to handle
    }
}

async function getCompanyData(companyHash: string): Promise<{
    companyName: string,
    companyDescription: string
}> {
    try {
        const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${companyHash}/`);

        if (!response.ok) {
            throw new Error(`Failed to fetch company data. Status: ${response.status}`);
        }

        const company = await response.json();
        console.log(company);

        // Ensure that the required properties are present in the response
        if (!company.companyName || !company.companyDescription) {
            throw new Error("Invalid company data format");
        }

        return {
            companyName: company.companyName,
            companyDescription: company.companyDescription
        };
    } catch (error) {
        console.error("Error fetching company data:", error);
        throw error; // Re-throw the error for the calling code to handle
    }
}


export {
    uploadReview,
    uploadCompanyData,
    getReview,
    getCompanyData
}

