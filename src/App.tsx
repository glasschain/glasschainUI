import { HashRouter } from "react-router-dom";
import Layout from "./Layout";
import { useState } from "react";
import {
  uploadReview,
  uploadCompanyData,
  getReview,
  getCompanyData
} from './hooks/ipfs'

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
      <HashRouter>
        <Layout />
      </HashRouter>
    </>
  );
}
