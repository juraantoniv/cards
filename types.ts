import { DataItemType } from "./src/components/ui/tableDecks";

export type Pagination = {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};
export type userRegisterType = {
  name: string;
  password: string;
  email: string;
  subject: string;
  sendConfirmationEmail: boolean;
};

export type Author = {
  id: string;
  name: string;
};

export type Items = {
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover?: any;
  rating: number;
  isDeleted?: any;
  isBlocked?: any;
  created: string;
  updated: string;
  cardsCount: number;
  author: Author;
};

export type decksResponse = {
  maxCardsCount: number;
  pagination: Pagination;
  items: DataItemType[];
};
