import React from "react";
import {
  ButtonGroup,
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalOverlay,
} from "../styles/ModalStyles";

interface AlertModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AlertModal = ({ isModalOpen, onCancel, onConfirm }: AlertModalProps) => {
  if (!isModalOpen) return null;
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent>
        <div>Want to delete?</div>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlertModal;
