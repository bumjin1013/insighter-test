import React from "react";
import { EventCardProps } from "@/types/event";
import {
  Card,
  DateTime,
  Title,
  Location,
  Description,
  Button,
} from "../styles/EventCardStyles";

interface EventCardComponentProps extends EventCardProps {
  onDelete: () => void;
  onEdit: () => void;
  setEvents: React.Dispatch<React.SetStateAction<EventCardProps[]>>;
}

const EventCard: React.FC<EventCardComponentProps> = (props) => {
  const { id, name, date, time, location, description, onDelete, onEdit } =
    props;

  return (
    <Card>
      <Title>{name}</Title>
      <DateTime>
        {date} at {time}
      </DateTime>
      <Location>{location}</Location>
      <Description>{description}</Description>
      <Button onClick={() => onEdit()}>Edit</Button>
      <Button onClick={() => onDelete()}>Delete</Button>
    </Card>
  );
};

export default React.memo(EventCard);
