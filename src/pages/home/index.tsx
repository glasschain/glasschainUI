import styled from "styled-components";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useHistory } from "react-router";
import { useWeb3Context } from "../../contexts/web3Context";
import registerUser from "../../hooks/interact/registerUser";
import MyForm from "./form";
import fetchAllCompanies from "../../hooks/interact/fetchAllCompanies";
import ReviewForm from "./reviewForm";
import fetchCompanyRatings from "../../hooks/interact/fetchCompanyRatings";
import SimpleForm from "./commentForm";
import fetchUser from "../../hooks/interact/fetchUser";

const { Dragger } = Upload;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = styled.div`
  width: 50%;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid grey;
  min-height: 50vh;
  display: grid;
  .ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-name {
    white-space: wrap;
  }
`;

const RegisterText = styled.div`
  font-size: 1.7em;
  margin-bottom: 16px;
  color: black;
  font-weight: 600;
  line-height: 2.5rem;
  letter-spacing: -0.02em;
`;

const RegisterButton = styled.button`
  padding: 12px;
  border: none;
  background: teal;
  color: white;
  margin-top: 24px;
  cursor: pointer;
`;

export default function Home() {
  const history = useHistory();
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [emlFielContent, setEmlFileContent] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const { signer } = useWeb3Context();

  const handleRegister = () => {
    const domain = extractDomainFromEml();
    console.log(domain, signer);
    const resp = registerUser(signer, domain);
    console.log(resp);
    history.push("/companies");
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload(file) {
      const isEmlFile = file.name.toLowerCase().endsWith(".eml");

      if (!isEmlFile) {
        message.error("You can only upload .eml files!");
        return false; // Prevent default upload behavior
      }

      // Use FileReader to read the content of the uploaded file
      const reader = new FileReader();

      reader.onload = (event) => {
        const emlContent = event?.target?.result;
        setEmlFileContent(emlContent);

        // Add your logic to process the EML content here
      };

      // Read the file as text
      reader.readAsText(file);

      return false; // Prevent default upload behavior
    },
    onChange(info) {
      const { uid, status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (uid) {
        message.success(`${info.file.name} file uploaded successfully.`);
        setIsFileUploaded(true);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      setIsFileUploaded(true);
    },
  };

  // Function to extract domain from email address
  const extractDomain = (email) => {
    const [, domain] = email.split("@");
    return domain;
  };

  // Function to extract domain from EML content
  const extractDomainFromEml = () => {
    // Regular expression to match email addresses
    const emailRegex = /(?:To|From): ([^\s@]+@[^\s@]+)/g;

    // Extract all email addresses from the content
    const matches =
      emlFielContent === null || emlFielContent === undefined
        ? []
        : emlFielContent.match(emailRegex);

    if (matches) {
      // Extract domain from the first email address (you can loop through all addresses if needed)
      const firstEmailAddress = matches[0].split(": ")[1];
      const domain = extractDomain(firstEmailAddress);
      return domain;
    } else {
      return null;
    }
  };

  return (
    <Wrapper>
      {/* <ReviewForm signer={signer} />
      <SimpleForm signer={signer} /> */}
      {/* <button
        onClick={async () => {
          await fetchAllCompanies(signer);
        }}
      >
        fetch companies
      </button> */}
      {/* <button
        onClick={async () => {
          await fetchCompanyRatings(signer, "gmail.com");
        }}
      >
        fetch company rating
      </button>
      <button
        onClick={async () => {
          await fetchUser(signer);
        }}
      >
        fetch user
      </button> */}
      {/* <MyForm signer={signer} /> */}
      <RegisterForm>
        <RegisterText>Register</RegisterText>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Drop .eml fire here!</p>
        </Dragger>
        <RegisterButton onClick={handleRegister} disabled={!isFileUploaded}>
          Register
        </RegisterButton>
      </RegisterForm>
    </Wrapper>
  );
}
