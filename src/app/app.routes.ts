import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './services/services.component';
import { DuyurularComponent } from './components/duyurular/duyurular';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hakkimizda', component: AboutComponent }, 
  { path: 'hizmetlerimiz', component: ServicesComponent }, 
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'duyurular', component: DuyurularComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];