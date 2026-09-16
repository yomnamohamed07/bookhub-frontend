import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookFormComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  loading = true;
  errorMessage = '';

  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  readonly pageSizeOptions = [5, 10, 20, 50];

  selectedBook: Book | null = null;
  detailsLoading = false;
  detailsError = '';

  bookPendingDelete: Book | null = null;
  deleting = false;
  showFormModal = false;
  editingBookId: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  get rangeStart(): number {
    if (this.totalCount === 0) {
      return 0;
    }
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.pageIndex * this.pageSize, this.totalCount);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.pageIndex;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const pages: number[] = [];
    for (let page = start; page <= end; page++) {
      pages.push(page);
    }
    return pages;
  }

  fetchBooks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookService.getAll(this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        this.books = response.data ?? [];
        this.totalCount = response.count ?? 0;
        this.pageIndex = response.pageIndex || this.pageIndex;
        this.pageSize = response.pageSize || this.pageSize;
        this.loading = false;

        if (this.books.length === 0 && this.totalCount > 0 && this.pageIndex > 1) {
          this.pageIndex = this.totalPages;
          this.fetchBooks();
        }
      },
      error: (err) => {
        console.error('Get books error:', err);
        this.errorMessage =
          'Couldn\'t reach the catalog service. Check that the API is running and the address in environment.ts is correct.';
        this.loading = false;
      }
    });
  }

  openDetails(book: Book): void {
    this.detailsError = '';
    this.detailsLoading = true;
    this.selectedBook = book;

    this.bookService.getById(book.id).subscribe({
      next: (fresh) => {
        this.selectedBook = fresh;
        this.detailsLoading = false;
      },
      error: (err) => {
        console.error('Get book by id error:', err);
        this.detailsLoading = false;
        this.detailsError = 'Could not load this book. It may have been removed.';
      }
    });
  }

  closeDetails(): void {
    this.selectedBook = null;
    this.detailsError = '';
    this.detailsLoading = false;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.pageIndex || this.loading) {
      return;
    }
    this.pageIndex = page;
    this.fetchBooks();
  }

  onPageSizeChange(size: string | number): void {
    const next = Number(size);
    if (!next || next === this.pageSize) {
      return;
    }
    this.pageSize = next;
    this.pageIndex = 1;
    this.fetchBooks();
  }

  openAddModal(): void {
    this.editingBookId = null;
    this.showFormModal = true;
  }

  openEditModal(book: Book, event?: Event): void {
    event?.stopPropagation();
    this.closeDetails();
    this.editingBookId = book.id;
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.editingBookId = null;
  }

  onFormSaved(): void {
    this.closeFormModal();
    this.fetchBooks();
  }

  askDelete(book: Book, event?: Event): void {
    event?.stopPropagation();
    this.closeDetails();
    this.bookPendingDelete = book;
  }

  cancelDelete(): void {
    this.bookPendingDelete = null;
  }

  confirmDelete(): void {
    if (!this.bookPendingDelete) {
      return;
    }

    const id = this.bookPendingDelete.id;
    this.deleting = true;

    this.bookService.delete(id).subscribe({
      next: () => {
        this.bookPendingDelete = null;
        this.deleting = false;
        this.fetchBooks();
      },
      error: (err) => {
        console.error('Delete book error:', err);
        this.errorMessage = 'Could not remove this book. Please try again.';
        this.deleting = false;
        this.bookPendingDelete = null;
      }
    });
  }
}
