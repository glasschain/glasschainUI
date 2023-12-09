import React from "react";
import { Button, Form, Input, Rate } from "antd";
import { useWeb3Context } from "../../contexts/web3Context";
import addReview from "../../hooks/interact/addReview";
import fetchUser from "../../hooks/interact/fetchUser";

const { TextArea } = Input;

export default function AddReview() {
  const { signer } = useWeb3Context();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { rate, textarea } = values;
    if (signer) {
      const fecthData = async () => {
        const res = await fetchUser(signer);
        return res;
      };
      fecthData().then(async (res) => {
        const domain = res?.domain;
        const tx = await addReview(signer, domain, rate, textarea);
        console.log(tx);
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="textarea" label="Comment">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Review
        </Button>
      </Form.Item>
    </Form>
  );
}
