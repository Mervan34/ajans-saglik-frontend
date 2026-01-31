import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { SocialSidebarComponent } from './shared/social-sidebar/social-sidebar.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,SocialSidebarComponent],
  template: `
    <nav class="navbar">
  <div class="nav-container">
    <a routerLink="/" class="nav-brand logo">
  <span class="logo-agency">AJANS</span>
  <span class="logo-divider"></span>
  <span class="logo-health">SAĞLIK</span>
</a>

    <!-- Hamburger menü -->
    <button class="nav-toggle" (click)="toggleMenu()">☰</button>

    <!-- Overlay Menü -->
    <div class="nav-menu" [class.open]="menuOpen">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Ana Sayfa</a>
      <a routerLink="/hakkimizda" routerLinkActive="active" (click)="closeMenu()">Hakkımızda</a>
      <a routerLink="/hizmetlerimiz" routerLinkActive="active" (click)="closeMenu()">Hizmetlerimiz</a>
      <a routerLink="/portfolio" routerLinkActive="active" (click)="closeMenu()">Portföy</a>
      <a routerLink="/iletisim" routerLinkActive="active" (click)="closeMenu()">İletişim</a>
      <a routerLink="/duyurular" routerLinkActive="active" (click)="closeMenu()">Duyurular</a>
      <a *ngIf="isAuthenticated$ | async" routerLink="/admin" routerLinkActive="active" (click)="closeMenu()">Admin</a>
    </div>

    <!-- Menü açıkken overlay arka plan -->
    <div class="menu-backdrop" *ngIf="menuOpen" (click)="closeMenu()"></div>
  </div>
</nav>

<main>
  <router-outlet></router-outlet>
</main>
<app-social-sidebar></app-social-sidebar>
<footer class="footer">
  <div class="footer-container">
    <p>&copy; 2024 Ajans Sağlık. Tüm hakları saklıdır.</p>
  </div>
</footer>

  `,
  styles: [`
    :host {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* LOGO KAPSAYICI */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* AJANS */
.logo-agency {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: #ffffff;
}

/* DİKEY AYIRICI */
.logo-divider {
  width: 2px;
  height: 26px;
  background: linear-gradient(
    to bottom,
    #38bdf8,
    #22c55e
  );
  border-radius: 2px;
}

/* SAĞLIK */
.logo-health {
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 6px;
  color: #cbd5e1;
}


/* Navbar */
.navbar {
  background: #2c3e50;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

/* Hamburger menu button */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

/* Menu */
.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-menu a:hover,
.nav-menu a.active {
  color: #3498db;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-menu {
    flex-direction: column;
    gap: 20px;
    position: fixed;
    top: 0;
    right: -250px; /* başlangıçta kapalı */
    height: 100vh;
    width: 250px;
    background: #2c3e50;
    padding: 60px 20px 20px 20px;
    box-shadow: -2px 0 8px rgba(0,0,0,0.2);
    transition: right 0.3s ease;
    z-index: 1002;
  }

  .nav-menu.open {
    right: 0; /* menü açıkken */
  }
  .menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    z-index: 1000;
  }
}


  `]
})
export class AppComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.setGlobalSeo();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  private setGlobalSeo() {
    this.meta.addTags([
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ajans Sağlık' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:site_name', content: 'Ajans Sağlık' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'tr_TR' }
    ]);
  }
}

  
