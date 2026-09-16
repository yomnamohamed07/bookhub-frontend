import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent, title: 'Catalog — The Shelf' },
  { path: 'books/new', component: BookFormComponent, title: 'Add a Book — The Shelf' },
  { path: 'books/:id/edit', component: BookFormComponent, title: 'Edit Book — The Shelf' },
  { path: '**', redirectTo: 'books' }
];
