import React from "react";
import {
  CloseButton,
  ModalContent,
  ModalOverlay,
  Form,
  Label,
  Input,
  Textarea,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from "../styles/ModalStyles";
import { EventCardProps } from "@/types/event";

interface EditModalProps {
  selectedEvent: EventCardProps | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventCardProps | null>>;
  isModalOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const EditModal = ({
  selectedEvent,
  setSelectedEvent,
  isModalOpen,
  onCancel,
  onSave,
}: EditModalProps) => {
  if (!isModalOpen) return null;
  const { name, date, time, location, description } = selectedEvent || {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSelectedEvent((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onCancel}>X</CloseButton>
        <h2>Edit Event</h2>
        <Form>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Date:
            <Input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Time:
            <Input
              type="time"
              name="time"
              value={time}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Location:
            <Input
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Description:
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
            ></Textarea>
          </Label>
          <ButtonGroup>
            <CancelButton type="button" onClick={onCancel}>
              Cancel
            </CancelButton>
            <ConfirmButton type="button" onClick={onSave}>
              Save
            </ConfirmButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditModal;
