import { Modal } from "antd";
import { MouseEvent } from "react";

export default function WalletModal(props: {
  isWalletModalOpen: boolean | undefined;
  toggleWalletModal: ((e: MouseEvent) => void) | undefined;
}) {
  return (
    <Modal
      open={props.isWalletModalOpen}
      onCancel={props.toggleWalletModal}
      onOk={props.toggleWalletModal}
    >
      <ul></ul>
    </Modal>
  );
}
