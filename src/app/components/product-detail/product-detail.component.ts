import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product,ProductCategory, CATEGORY_NAMES } from '../../models/product.model';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-container" *ngIf="product; else loading">
      <div class="detail-header">
        <h1>{{product.title}}</h1>
        <span class="category-badge">{{getCategoryName(product.category)}}</span>
      </div>

      <div class="detail-grid">
        <div class="info-section">
          <div class="info-card">
            <h2>Genel Bilgiler</h2>
            <div class="info-row">
              <span class="label">Şehir:</span>
              <span class="value">{{product.city}}</span>
            </div>
            <div class="info-row">
              <span class="label">Kategori:</span>
              <span class="value">{{getCategoryName(product.category)}}</span>
            </div>
            <div class="info-row" *ngIf="product.staff">
              <span class="label">Kadrolar:</span>
              <span class="value">{{product.staff}}</span>
            </div>
            <div class="info-row price-row">
              <span class="label">Fiyat:</span>
              <span class="value price">{{formatPrice(product.price)}} TL</span>
            </div>
          </div>

          <div class="info-card" *ngIf="product.description">
            <h2>Açıklama</h2>
            <p>{{product.description}}</p>
          </div>

          <div class="info-card" *ngIf="product.contactInfo">
            <h2>İletişim Bilgileri</h2>
            <p class="contact-info">{{product.contactInfo}}</p>
          </div>
        </div>

        <div class="action-section">
          <div class="action-card">
            <h3>İlgileniyorum</h3>
            <p>Bu ürün hakkında detaylı bilgi almak için bizimle iletişime geçin.</p>
            <button 
              [routerLink]="['/iletisim']" 
              [queryParams]="{productId: product.id, type: 'buy'}"
              class="btn-contact">
              İletişime Geç
            </button>
          </div>

          <div class="action-card">
            <h3>Tüm Portföy</h3>
            <p>Diğer fırsatları görmek için portföyümüzü inceleyin.</p>
            <button routerLink="/portfolio" class="btn-portfolio">
              Portföyü Gör
            </button>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loading>
      <div class="loading">Yükleniyor...</div>
    </ng-template>
  `,
  styles: [`
    .detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .detail-header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3498db;
    }

    .detail-header h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .category-badge {
      background: #3498db;
      color: white;
      padding: 8px 20px;
      border-radius: 25px;
      font-size: 1rem;
      display: inline-block;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }

    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }

    .info-card, .action-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .info-card h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #ecf0f1;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #7f8c8d;
    }

    .value {
      color: #2c3e50;
    }

    .price-row {
      margin-top: 10px;
      padding-top: 20px;
      border-top: 2px solid #ecf0f1;
    }

    .price {
      color: #27ae60;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .contact-info {
      color: #555;
      line-height: 1.8;
      white-space: pre-wrap;
    }

    .action-card h3 {
      color: #2c3e50;
      margin-bottom: 15px;
    }

    .action-card p {
      color: #7f8c8d;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .btn-contact, .btn-portfolio {
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-contact {
      background: #27ae60;
      color: white;
    }

    .btn-contact:hover {
      background: #229954;
      transform: translateY(-2px);
    }

    .btn-portfolio {
      background: #3498db;
      color: white;
    }

    .btn-portfolio:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .loading {
      text-align: center;
      padding: 100px 20px;
      font-size: 1.5rem;
      color: #7f8c8d;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  @Inject(PLATFORM_ID) private platformId: Object,
  private seo: SeoService
) {}


  ngOnInit(): void {
  const id = Number(this.route.snapshot.params['id']);

  this.productService.getProduct(id).subscribe({
    next: (data) => {
      this.product = data;

      if (this.product) {
        this.setSeo(this.product);
      }
    },
    error: (err) => console.error('Ürün yüklenemedi:', err)
  });
}


getCategoryName(category: ProductCategory): string {
  return CATEGORY_NAMES[category];
}

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price);
  }

  private setSeo(product: Product): void {
  const categoryName = this.getCategoryName(product.category);

  this.seo.update({
    title: `${product.title} | ${categoryName} | Ajans Sağlık`,
    description: `${product.city} ilinde ${categoryName.toLowerCase()} fırsatı. 
${product.staff ? product.staff + ' kadrolu, ' : ''}${product.price.toLocaleString('tr-TR')} TL fiyat ile sağlık yatırımı.`,
    keywords: `
      ${categoryName},
      satılık ${categoryName.toLowerCase()},
      ${product.city} satılık sağlık kuruluşu,
      hastane satışı,
      klinik devri,
      ajans sağlık
    `
  });
}

}