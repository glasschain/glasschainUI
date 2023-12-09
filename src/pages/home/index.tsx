import styled from "styled-components";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  beforeUpload(file) {
    const isEmlFile = file.type === "message/rfc822"; // Add your desired file extension check
    if (!isEmlFile) {
      message.error("You can only upload .eml files!");
    }
    return isEmlFile;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

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
`;

export default function Home() {
  return (
    <Wrapper>
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
        <RegisterButton>Register</RegisterButton>
      </RegisterForm>
    </Wrapper>
  );
}
