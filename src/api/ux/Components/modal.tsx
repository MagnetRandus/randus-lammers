// ModalComponent.tsx

import React from "react";
import { Modal, Stack, PrimaryButton, DefaultButton } from "@fluentui/react";
import modalStyle from "./modal.style";

interface IPropsModalConfirm {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  modalTitle: string;
}

const ModalConfirm: React.FC<IPropsModalConfirm> = ({
  isOpen,
  onClose,
  onAccept,
  modalTitle,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onClose}
      isBlocking={false} // Set to true if modal is blocking
      styles={modalStyle}
    >
      <Stack horizontalAlign="center" verticalAlign="center">
        <h2>{modalTitle}</h2>
        <p>Are you sure you want to proceed?</p>
        <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="end">
          <PrimaryButton text="Accept" onClick={onAccept} />
          <DefaultButton text="Cancel" onClick={onClose} />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ModalConfirm;
