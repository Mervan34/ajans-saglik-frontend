import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ContactService } from '../../../services/contact.service';
import { AuthService } from '../../../services/auth.service';
import { Product, ProductCategory, CATEGORY_NAMES } from '../../../models/product.model';
import { ContactRequest, RequestType, REQUEST_TYPE_NAMES } from '../../../models/contact-request.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Admin Paneli</h1>
        <button (click)="logout()" class="btn-logout">Çıkış Yap</button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Toplam Ürün</h3>
          <p class="stat-number">{{products.length}}</p>
        </div>
        <div class="stat-card">
          <h3>Görünür Ürün</h3>
          <p class="stat-number">{{getVisibleCount()}}</p>
        </div>
        <div class="stat-card">
          <h3>Bekleyen Talepler</h3>
          <p class="stat-number">{{getPendingRequests()}}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2>Ürünler</h2>
          <button routerLink="/admin/products/new" class="btn-add">+ Yeni Ürün Ekle</button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Şehir</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>Durum</th>
                <th>Görünürlük</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of products">
                <td>{{product.title}}</td>
                <td>{{product.city}}</td>
                <td>{{getCategoryName(product.category)}}</td>
                <td>{{formatPrice(product.price)}} TL</td>
                <td>
                  <span [class]="'status-badge status-' + product.status?.toLowerCase()">
                    {{getStatusText(product.status)}}
                  </span>
                </td>
                <td>
                  <button (click)="toggleVisibility(product.id!)" 
                          [class]="'btn-visibility ' + (product.visible ? 'visible' : 'hidden')">
                    {{product.visible ? '👁️ Görünür' : '🚫 Gizli'}}
                  </button>
                </td>
                <td class="actions">
                  <button [routerLink]="['/admin/products/edit', product.id]" 
                          class="btn-edit">Düzenle</button>
                  <button (click)="deleteProduct(product.id!)" 
                          class="btn-delete">Sil</button>
                  <button *ngIf="product.status === 'ACTIVE'" 
                          (click)="markAsSold(product.id!)"
                          class="btn-sold">Satıldı</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <h2>İletişim Talepleri</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Ad Soyad</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Talep Tipi</th>
                <th>Ürün</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let request of contactRequests">
                <td>{{formatDate(request.createdAt)}}</td>
                <td>{{request.name}}</td>
                <td>{{request.email}}</td>
                <td>{{request.phone}}</td>
                <td>{{getRequestTypeName(request.requestType)}}</td>
                <td>{{request.productTitle || '-'}}</td>
                <td>
                  <span class="status-badge">{{getRequestStatusText(request.status)}}</span>
                </td>
                <td class="actions">
                <button (click)="deleteContactRequest(request.id!)"
                class="btn-delete"> Sil </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .admin-header h1 {
      color: #2c3e50;
      margin: 0;
    }

    .btn-logout {
      padding: 10px 20px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-logout:hover {
      background: #c0392b;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-card h3 {
      color: #7f8c8d;
      margin: 0 0 10px 0;
      font-size: 0.9rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #3498db;
      margin: 0;
    }

    .section {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section h2 {
      color: #2c3e50;
      margin: 0 0 20px 0;
    }

    .btn-add {
      padding: 10px 20px;
      background: #27ae60;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-add:hover {
      background: #229954;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn-edit, .btn-delete, .btn-sold {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .btn-edit {
      background: #3498db;
      color: white;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
    }

    .btn-sold {
      background: #f39c12;
      color: white;
    }

    .btn-visibility {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-visibility.visible {
      background: #27ae60;
      color: white;
    }

    .btn-visibility.hidden {
      background: #95a5a6;
      color: white;
    }

    .btn-visibility:hover {
      opacity: 0.8;
    }

    .status-badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .status-active {
      background: #d4edda;
      color: #155724;
    }

    .status-sold {
      background: #fff3cd;
      color: #856404;
    }

    .status-inactive {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  contactRequests: ContactRequest[] = [];

  constructor(
    private productService: ProductService,
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadContactRequests();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  loadContactRequests(): void {
    this.contactService.getAllContactRequests().subscribe({
      next: (data) => this.contactRequests = data,
      error: (err) => console.error('Error loading requests:', err)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }

  markAsSold(id: number): void {
    if (confirm('Bu ürünü satıldı olarak işaretlemek istediğinizden emin misiniz?')) {
      this.productService.markAsSold(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error marking as sold:', err)
      });
    }
  }

  toggleVisibility(id: number): void {
    this.productService.toggleVisibility(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error toggling visibility:', err)
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }

  getCategoryName(category: string): string {
    return CATEGORY_NAMES[category as ProductCategory] ?? category;
  }

  getRequestTypeName(type: string): string {
    return REQUEST_TYPE_NAMES[type as RequestType] ?? type;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price);
  }

  formatDate(date: any): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getStatusText(status: any): string {
    const statusMap: any = {
      'ACTIVE': 'Aktif',
      'SOLD': 'Satıldı',
      'INACTIVE': 'Pasif'
    };
    return statusMap[status] || status;
  }

  getRequestStatusText(status: any): string {
    const statusMap: any = {
      'PENDING': 'Bekliyor',
      'CONTACTED': 'İletişime Geçildi',
      'COMPLETED': 'Tamamlandı',
      'CANCELLED': 'İptal'
    };
    return statusMap[status] || status;
  }

  getPendingRequests(): number {
    return this.contactRequests.filter(r => !r.status || r.status === 'PENDING').length;
  }

  getVisibleCount(): number {
    return this.products.filter(p => p.visible).length;
  }
  deleteContactRequest(id: number): void {
    if (confirm('Bu iletişim talebini silmek istediğinizden emin misiniz?')) {
      this.contactService.deleteContactRequest(id).subscribe({
        next: () => {
          this.contactRequests =
            this.contactRequests.filter(r => r.id !== id);
        },
        error: err => console.error('İletişim talebi silinemedi', err)
      });
    }
  }

}