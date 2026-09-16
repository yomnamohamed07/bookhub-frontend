import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { BookService } from '../../services/book.service';

import {
  AddBookDto,
  UpdateBookDto
} from '../../models/book.model';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() embedded = false;

  @Input() presetBookId: number | null = null;

  @Output() saved = new EventEmitter<void>();

  @Output() cancelled = new EventEmitter<void>();


  form: FormGroup;

  isEditMode = false;

  bookId: number | null = null;

  loading = false;

  saving = false;

  loadError = '';

  submitError = '';


  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ]
      ],

      author: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ]
      ],

      isbn: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],

      category: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]
      ],

      availableCopies: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });
  }


  ngOnInit(): void {

    const idParam = this.embedded
      ? this.presetBookId
      : this.route.snapshot.paramMap.get('id');


    if (idParam) {

      this.isEditMode = true;

      this.bookId = Number(idParam);

      this.loadBook(this.bookId);
    }
  }


  loadBook(id: number): void {

    this.loading = true;

    this.loadError = '';

    this.bookService.getById(id).subscribe({

      next: (book) => {

        this.form.patchValue({

          title: book.title,

          author: book.author,

          isbn: book.isbn,

          category: book.category,

          availableCopies: book.availableCopies

        });

        this.loading = false;
      },

      error: () => {

        this.loadError =
          'Could not load this book. It may have been removed.';

        this.loading = false;
      }

    });
  }


  get f() {
    return this.form.controls;
  }


  cancel(): void {
    if (this.embedded) {
      this.cancelled.emit();
      return;
    }

    this.router.navigate(['/books']);
  }


  onSubmit(): void {

    this.submitError = '';

    this.form.get('isbn')?.setErrors(null);

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }


    this.saving = true;


    if (this.isEditMode && this.bookId !== null) {

      const updateDto: UpdateBookDto = {

        id: this.bookId,

        title: this.form.value.title,

        author: this.form.value.author,

        isbn: this.form.value.isbn,

        category: this.form.value.category,

        availableCopies: this.form.value.availableCopies

      };


      this.bookService.update(updateDto).subscribe({

        next: () => {

          this.saving = false;

          if (this.embedded) {

            this.saved.emit();

          } else {

            this.router.navigate(['/books']);

          }

        },

        error: (err) => {

          this.handleError(err);

        }

      });

    }

    else {

      const addDto: AddBookDto = {

        title: this.form.value.title,

        author: this.form.value.author,

        isbn: this.form.value.isbn,

        category: this.form.value.category,

        availableCopies: this.form.value.availableCopies

      };


      this.bookService.create(addDto).subscribe({

        next: () => {

          this.saving = false;

          if (this.embedded) {

            this.saved.emit();

          } else {

            this.router.navigate(['/books']);

          }

        },

        error: (err) => {

          this.handleError(err);

        }

      });

    }

  }


  private handleError(err: any): void {

    this.saving = false;

   const backendMessage =
     err?.error?._errormessage ||
     err?.error?.errorMessage ||
      err?.error?.message ||
      err?.error?.error;

    if (err?.status === 400) {

      if (err?.error?.errors && Array.isArray(err.error.errors)) {

        this.submitError = err.error.errors[0];
      }
      else {

        this.submitError =
          backendMessage ||
          'Invalid data. Please check the form.';

        if (backendMessage?.toLowerCase().includes('isbn')) {

          this.form.get('isbn')?.setErrors({
            backend: true,
            message: backendMessage
          });

          this.form.get('isbn')?.markAsTouched();

        }

      }

    }
    else if (err?.status === 404) {

      this.submitError =
        backendMessage ||
        'The requested book was not found.';

    }
    else {

      this.submitError =
        'Something went wrong while saving. Please try again.';

    }

  }

}