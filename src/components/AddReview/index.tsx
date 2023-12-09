import React from "react";
import { Button, Form, Input, Rate } from "antd";
import { useWeb3Context } from "../../contexts/web3Context";

const { TextArea } = Input;

const onFinish = (values: any) => {
  console.log("Success:", values);
  console.log(signer);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export default function AddReview() {
  const { signer } = useWeb3Context();

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={async () => onFinish}
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
