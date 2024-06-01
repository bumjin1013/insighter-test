export interface EventCardProps {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export type SortOrderType = "asc" | "desc";

export type SortByType = "name" | "date";
