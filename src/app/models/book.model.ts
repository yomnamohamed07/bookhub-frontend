export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
}

export interface AddBookDto {
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
}

export interface UpdateBookDto {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
}

export interface BooksResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Book[];
}