import { HashRouter } from "react-router-dom";
import Layout from "./Layout";
import { useState } from "react";
import { Web3Provider } from "./contexts/web3Context";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function App() {
  const [hash, setHash] = useState<string>("");
  return (
    <>
      {/* <div>
        <button onClick={async () => {
          const respComment = await uploadReview("test comment 2")
          console.log("here", respComment)
          setHash(respComment.Hash)
        }} > addReview</button>
        <button onClick={async () => {
          const respComment = await getReview(hash)
          console.log(respComment)
        }
        } > getReview</button>
      </div> */}
      <AnonAadhaarProvider
        _appId={"989376886044841150015661659239621852908048351232"}
      >
        <Web3Provider>
          <HashRouter>
            <Layout />
          </HashRouter>
        </Web3Provider>
      </AnonAadhaarProvider>
    </>
  );
}
