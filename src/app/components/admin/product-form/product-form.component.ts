import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, ProductCategory, CATEGORY_NAMES } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h1>{{isEditMode ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}}</h1>
      </div>

      <form (ngSubmit)="onSubmit()" #productForm="ngForm">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Başlık *</label>
            <input type="text" id="title" name="title" 
                   [(ngModel)]="product.title" required
                   placeholder="Örn: Satılık 25 Kadro 58 Yataklı Hastane"
                   class="form-control">
          </div>

          <div class="form-group">
            <label for="city">Şehir *</label>
            <input type="text" id="city" name="city" 
                   [(ngModel)]="product.city" required
                   placeholder="İstanbul" class="form-control">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Kategori *</label>
            <select id="category" name="category" 
                    [(ngModel)]="product.category" required
                    class="form-control">
              <option value="">Seçiniz</option>
              <option *ngFor="let cat of categories" [ngValue]="cat">
              {{getCategoryName(cat)}}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="price">Fiyat (TL) *</label>
            <input type="number" id="price" name="price" 
                   [(ngModel)]="product.price" required min="0"
                   placeholder="70000000" class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label for="staff">Kadrolar</label>
          <input type="text" id="staff" name="staff" 
                 [(ngModel)]="product.staff"
                 placeholder="Kardiyoloji (2), Genel Cerrahi (1)"
                 class="form-control">
        </div>

        <div class="form-group">
          <label for="description">Açıklama</label>
          <textarea id="description" name="description" 
                    [(ngModel)]="product.description" rows="5"
                    placeholder="Ürün hakkında detaylı bilgi..."
                    class="form-control"></textarea>
        </div>

        <div class="form-group">
          <label for="contactInfo">İletişim Bilgileri</label>
          <textarea id="contactInfo" name="contactInfo" 
                    [(ngModel)]="product.contactInfo" rows="3"
                    placeholder="Telefon, email vb."
                    class="form-control"></textarea>
        </div>

        <div class="form-group">
          <div class="visibility-control">
            <label class="checkbox-label">
              <input type="checkbox" 
                     [(ngModel)]="product.visible" 
                     name="visible"
                     class="checkbox-input">
              <span class="checkbox-text">
                <strong>Kullanıcı Sayfasında Göster (Vitrin)</strong>
                <small>Bu ürün ana sayfada ve portföyde görünür olacaktır</small>
              </span>
            </label>
          </div>
        </div>

        <div class="alert alert-info">
          <strong>💡 İpucu:</strong> Görünürlük ayarını daha sonra admin panelinden de değiştirebilirsiniz.
        </div>

        <div class="alert alert-error" *ngIf="errorMessage">
          {{errorMessage}}
        </div>

        <div class="form-actions">
          <button type="button" (click)="cancel()" class="btn-cancel">
            İptal
          </button>
          <button type="submit" [disabled]="!productForm.form.valid || isSubmitting"
                  class="btn-submit">
            {{isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
    }

    .form-header {
      background: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-header h1 {
      color: #2c3e50;
      margin: 0;
    }

    form {
      background: white;
      padding: 30px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      margin-bottom: 25px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: #3498db;
    }

    textarea.form-control {
      resize: vertical;
      font-family: inherit;
    }

    .visibility-control {
      background: #f8f9fa;
      border: 2px solid #3498db;
      border-radius: 8px;
      padding: 20px;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      cursor: pointer;
    }

    .checkbox-input {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-top: 2px;
    }

    .checkbox-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .checkbox-text strong {
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .checkbox-text small {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .alert {
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .alert-info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }

    .alert-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
    }

    .btn-submit, .btn-cancel {
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-submit {
      background: #27ae60;
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      background: #229954;
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-cancel {
      background: #95a5a6;
      color: white;
    }

    .btn-cancel:hover {
      background: #7f8c8d;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    title: '',
    city: '',
    category: ProductCategory.HASTANE,
    price: 0,
    visible: true
  };

  categories = Object.values(ProductCategory);
  isEditMode = false;
  isSubmitting = false;
  errorMessage = '';
  productId?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.productService.getProductAdmin(this.productId!).subscribe({
      next: (data) => this.product = data,
      error: (err) => {
        console.error('Error loading product:', err);
        this.errorMessage = 'Ürün yüklenemedi';
      }
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const operation = this.isEditMode
      ? this.productService.updateProduct(this.productId!, this.product)
      : this.productService.createProduct(this.product);

    operation.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        this.isSubmitting = false;
        console.error('Error saving product:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }

  getCategoryName(category: ProductCategory): string {
    return CATEGORY_NAMES[category] || category;
  }
}