import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="topbar">
      <a routerLink="/books" class="brand">
        <span class="brand-mark">The Shelf</span>
        <span class="brand-sub">Inventory</span>
      </a>
    </header>
    <main class="page">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .topbar {
      background: var(--ink);
      padding: 22px 40px;
      border-bottom: 1px solid var(--ink-soft);
    }
    .brand {
      display: inline-flex;
      align-items: baseline;
      gap: 10px;
      text-decoration: none;
    }
    .brand-mark {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 600;
      color: var(--paper);
      letter-spacing: 0.2px;
    }
    .brand-sub {
      font-family: var(--font-body);
      font-size: 13px;
      color: var(--brass);
    }
    .page {
      min-height: calc(100vh - 68px);
      background: var(--ink);
      padding: 40px;
    }
    @media (max-width: 640px) {
      .topbar, .page { padding: 20px; }
    }
  `]
})
export class AppComponent {}
