import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory, CATEGORY_NAMES } from '../../models/product.model';
import { ProductFilter } from '../../models/filter.model';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="portfolio-page">
      <!-- Header -->
      <!-- <div class="page-header">
        <div class="container">
          <h1>Portföyümüz</h1>
          <p>Sağlık sektöründe sizin için seçtiğimiz fırsatlar</p>
        </div>
      </div> -->

      <!-- Filters -->
      <div class="filters-section">
        <div class="container">
          <div class="filters-grid">
            <div class="filter-item">
              <label>Kategori</label>
              <select [(ngModel)]="filter.category" (change)="applyFilters()" class="filter-input">
                <option [ngValue]="undefined">Tümü</option>
                <option *ngFor="let cat of categories" [ngValue]="cat">
                  {{getCategoryName(cat)}}
                </option>
              </select>
            </div>

            <div class="filter-item">
              <label>Şehir</label>
              <input type="text" [(ngModel)]="filter.city" (input)="applyFilters()" 
                     placeholder="Şehir ara..." class="filter-input">
            </div>

            <div class="filter-item">
              <label>Min. Fiyat (TL)</label>
              <input type="number" [(ngModel)]="filter.minPrice" (input)="applyFilters()" 
                     placeholder="0" class="filter-input">
            </div>

            <div class="filter-item">
              <label>Max. Fiyat (TL)</label>
              <input type="number" [(ngModel)]="filter.maxPrice" (input)="applyFilters()" 
                     placeholder="∞" class="filter-input">
            </div>

            <div class="filter-item">
              <button (click)="clearFilters()" class="btn-clear">
                🔄 Temizle
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Products -->
      <div class="products-section">
        <div class="container">
          <div class="results-info">
            <span>{{totalItems}} sonuç bulundu</span>
          </div>

          <div class="products-grid" *ngIf="products.length > 0; else noProducts">
            <div *ngFor="let product of products" class="product-card">
              <div class="product-badge">{{getCategoryName(product.category)}}</div>
              <div class="product-content">
                <h3>{{product.title}}</h3>
                <div class="product-location">📍 {{product.city}}</div>
                <div class="product-staff" *ngIf="product.staff">
                  👨‍⚕️ {{product.staff}}
                </div>
                <div class="product-price">{{formatPrice(product.price)}} TL</div>
              </div>
              <div class="product-footer">
                <button [routerLink]="['/product', product.id]" class="btn-detail">
                  Detayları Gör →
                </button>
              </div>
            </div>
          </div>

          <ng-template #noProducts>
            <div class="no-products">
              <div class="no-products-icon">🔍</div>
              <h3>Ürün bulunamadı</h3>
              <p>Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.</p>
              <button (click)="clearFilters()" class="btn-primary">Filtreleri Temizle</button>
            </div>
          </ng-template>

          <!-- PAGINATION: sadece burayı ekledim, sayfanın yapısını bozmayacak şekilde -->
          <div class="pagination-container">
            <button (click)="prevPage()" [disabled]="currentPage === 1">← Önceki</button>

            <!-- Eğer çok sayfa varsa arada ... gösterecek basit mantık -->
            <ng-container *ngFor="let p of visiblePageNumbers()">
              <button
                *ngIf="p !== -1"
                (click)="goToPage(p)"
                [class.active]="p === currentPage">
                {{ p }}
              </button>

              <span *ngIf="p === -1" class="dots">...</span>
            </ng-container>

            <button (click)="nextPage()" [disabled]="currentPage === totalPages">Sonraki →</button>

            <select [(ngModel)]="pageSize" (change)="changePageSize()" class="page-size-select">
              <option [ngValue]="6">6</option>
              <option [ngValue]="12">12</option>
              <option [ngValue]="24">24</option>
            </select>
          </div>
          <!-- /PAGINATION -->

        </div>
      </div>
    </div>
  `,
  styles: [`
    .portfolio-page {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Header */
    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }

    .page-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .page-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    /* Filters */
    .filters-section {
      background: white;
      padding: 30px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      align-items: end;
    }

    .filter-item label {
      display: block;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }

    .filter-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s;
    }

    .filter-input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .btn-clear {
      width: 100%;
      padding: 12px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-clear:hover {
      background: #c0392b;
    }

    /* Products */
    .products-section {
      padding: 40px 20px;
    }

    .results-info {
      margin-bottom: 25px;
      color: #64748b;
      font-weight: 500;
    }

    /* Products */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px; /* biraz daha geniş boşluk */
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: none; /* gölge yeterli */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.product-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  text-align: center;
}

.product-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-content h3 {
  color: #2c3e50;
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.4;
  font-weight: 700;
}

.product-location, .product-staff {
  color: #64748b;
  font-size: 0.95rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #27ae60;
  margin-top: auto;
}

.product-footer {
  padding: 20px 24px 24px;
}

.btn-detail {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-detail:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-2px);
}


    /* No Products */
    .no-products {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: 12px;
    }

    .no-products-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .no-products h3 {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .no-products p {
      color: #64748b;
      margin-bottom: 25px;
    }

    .btn-primary {
      padding: 12px 30px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    /* Pagination (ufak, yapıyı bozmayacak şekilde) */
    .pagination-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 30px;
      flex-wrap: wrap;
    }

    .pagination-container button {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: white;
      cursor: pointer;
      transition: all 0.15s;
    }

    .pagination-container button.active {
      background: #3498db;
      color: #fff;
      border-color: #2980b9;
    }

    .pagination-container button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-container .dots {
      padding: 8px 6px;
      color: #64748b;
    }

    .page-size-select {
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      margin-left: 8px;
      background: white;
    }

    @media (max-width: 768px) {
      .page-size-select { margin-top: 8px; }
      .filters-grid {
        grid-template-columns: 1fr;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PortfolioComponent implements OnInit {
  // Tüm ürünler (backend'den gelen, filtre sonrası)
  productsAll: Product[] = [];
  // Görüntülenen sayfadaki ürünler
  products: Product[] = [];
  categories: ProductCategory[] = [];
  filter: ProductFilter = {};
  productsAllFiltered: Product[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  totalPages = 1;

  constructor(
  private productService: ProductService,
  @Inject(PLATFORM_ID) private platformId: Object,
  private seo: SeoService
) {}


  ngOnInit(): void {

  this.seo.update({
    title: 'Portföyümüz | Satılık Hastane, Klinik ve Sağlık Yatırımları',
    description:
      'Ajans Sağlık portföyünde satılık hastane, klinik, tıp merkezi ve sağlık yatırımı fırsatlarını inceleyin. Güvenilir ve gizli satış süreçleri.',
    keywords:
      'satılık hastane, satılık klinik, sağlık yatırımı, hastane devri, ajans sağlık portföy'
  });

  this.loadProducts();
  this.loadCategories();
}


  loadProducts(): void {
    this.productService.getVisibleProducts().subscribe({
      next: (data) => {
        this.productsAll = data || [];
        this.productsAllFiltered = this.productsAll; 
        this.totalItems = this.productsAll.length;
        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => console.error('Ürünler yüklenemedi:', err)
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data || [],
      error: (err) => console.error('Kategoriler yüklenemedi:', err)
    });
  }

  applyFilters(): void {
  let filtered = [...this.productsAll];

  // Kategori
  if (this.filter.category !== undefined) {
    filtered = filtered.filter(p => p.category === this.filter.category);
  }

  // Şehir (case-insensitive)
  if (this.filter.city && this.filter.city.trim() !== '') {
  const city = this.filter.city
    .trim()
    .toLocaleLowerCase('tr-TR'); // Türkçe karakterler için locale

  filtered = filtered.filter(p =>
    p.city?.toLocaleLowerCase('tr-TR').includes(city)
  );
}

  // Min Fiyat
  if (this.filter.minPrice !== undefined && this.filter.minPrice !== null) {
    filtered = filtered.filter(p => p.price >= this.filter.minPrice!);
  }

  // Max Fiyat
  if (this.filter.maxPrice !== undefined && this.filter.maxPrice !== null) {
    filtered = filtered.filter(p => p.price <= this.filter.maxPrice!);
  }

  this.productsAllFiltered = filtered; // geçici liste
  this.totalItems = filtered.length;
  this.currentPage = 1;
  this.updatePagination();
}


  clearFilters(): void {
    this.filter = {};
    this.currentPage = 1;
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    // ensure currentPage in range
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.products = this.productsAllFiltered.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  changePageSize() {
    this.currentPage = 1;
    this.updatePagination();
  }

  // Görünecek sayfa numaralarını döndürür.
  // Eğer many pages ise orta kısmı ... ile daraltırız.
  visiblePageNumbers(): (number)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // çevresindeki sayfa adedi
    const range: number[] = [];
    const result: number[] = [];

    const left = Math.max(1, current - delta);
    const right = Math.min(total, current + delta);

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= left && i <= right)) {
        range.push(i);
      }
    }

    let last = 0;
    for (const i of range) {
      if (last && i - last > 1) {
        result.push(-1); // -1 -> dots
      }
      result.push(i);
      last = i;
    }

    return result;
  }

  getCategoryName(category: ProductCategory): string {
    return CATEGORY_NAMES[category] || category;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price);
  }
}
