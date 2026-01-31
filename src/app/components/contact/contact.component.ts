import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { ContactRequest, RequestType, REQUEST_TYPE_NAMES } from '../../models/contact-request.model';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-page">
      <!-- Hero Section -->
      <!-- <div class="page-hero">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <div class="hero-icon">💬</div>
          <h1 class="page-title">İletişime Geçin</h1>
          <p class="page-subtitle">
            Sağlık sektöründeki yatırım hedefleriniz için uzman ekibimiz size yardımcı olmaya hazır.
            Formu doldurun, en kısa sürede size dönelim.
          </p>
        </div>
      </div> -->

      <div class="contact-content">
        <div class="container">
          <div class="content-grid">
            <!-- Contact Form -->
            <div class="form-section">
              <div class="form-card">
                <div class="form-header">
                  <h2>İletişim Formu</h2>
                  <p>Tüm alanları eksiksiz doldurunuz</p>
                </div>

                <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
                  <!-- Name -->
                  <div class="form-group" [class.has-error]="name.invalid && name.touched">
                    <label for="name" class="form-label">
                      <span class="label-icon">👤</span>
                      Ad Soyad
                      <span class="required">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      #name="ngModel"
                      [(ngModel)]="request.name" 
                      required
                      minlength="3"
                      placeholder="Adınızı ve soyadınızı giriniz" 
                      class="form-control">
                    <div class="error-message" *ngIf="name.invalid && name.touched">
                      <span *ngIf="name.errors?.['required']">Ad Soyad zorunludur</span>
                      <span *ngIf="name.errors?.['minlength']">En az 3 karakter olmalıdır</span>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="form-group" [class.has-error]="email.invalid && email.touched">
                    <label for="email" class="form-label">
                      <span class="label-icon">✉️</span>
                      Email Adresi
                      <span class="required">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      #email="ngModel"
                      [(ngModel)]="request.email" 
                      required
                      email
                      placeholder="ornek@email.com" 
                      class="form-control">
                    <div class="error-message" *ngIf="email.invalid && email.touched">
                      <span *ngIf="email.errors?.['required']">Email zorunludur</span>
                      <span *ngIf="email.errors?.['email']">Geçerli bir email giriniz</span>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="form-group" [class.has-error]="phone.invalid && phone.touched">
                    <label for="phone" class="form-label">
                      <span class="label-icon">📱</span>
                      Telefon Numarası
                      <span class="required">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      #phone="ngModel"
                      [(ngModel)]="request.phone" 
                      required
                      pattern="[0-9]{10,11}"
                      placeholder="05XX XXX XX XX" 
                      class="form-control">
                    <div class="error-message" *ngIf="phone.invalid && phone.touched">
                      <span *ngIf="phone.errors?.['required']">Telefon numarası zorunludur</span>
                      <span *ngIf="phone.errors?.['pattern']">Geçerli bir telefon numarası giriniz</span>
                    </div>
                  </div>

                  <!-- Request Type -->
                  <div class="form-group" [class.has-error]="requestType.invalid && requestType.touched">
                    <label for="requestType" class="form-label">
                      <span class="label-icon">📋</span>
                      Talep Türü
                      <span class="required">*</span>
                    </label>
                    <div class="select-wrapper">
                      <select 
                        id="requestType" 
                        name="requestType" 
                        #requestType="ngModel"
                        [(ngModel)]="request.requestType" 
                        required
                        class="form-control">
                        <option value="">Seçiniz</option>
                        <option *ngFor="let type of requestTypes" [value]="type">
                          {{getRequestTypeName(type)}}
                        </option>
                      </select>
                    </div>
                    <div class="error-message" *ngIf="requestType.invalid && requestType.touched">
                      Talep türü seçiniz
                    </div>
                  </div>

                  <!-- Message -->
                  <div class="form-group" [class.has-error]="message.invalid && message.touched">
                    <label for="message" class="form-label">
                      <span class="label-icon">💬</span>
                      Mesajınız
                      <span class="required">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      #message="ngModel"
                      [(ngModel)]="request.message" 
                      required
                      minlength="10"
                      rows="6" 
                      placeholder="Mesajınızı buraya yazın..."
                      class="form-control textarea"></textarea>
                    <div class="error-message" *ngIf="message.invalid && message.touched">
                      <span *ngIf="message.errors?.['required']">Mesaj zorunludur</span>
                      <span *ngIf="message.errors?.['minlength']">En az 10 karakter olmalıdır</span>
                    </div>
                  </div>

                  <!-- Alerts -->
                  <div class="alert alert-success" *ngIf="successMessage">
                    <div class="alert-icon">✓</div>
                    <div class="alert-content">
                      <strong>Başarılı!</strong>
                      <p>{{successMessage}}</p>
                    </div>
                  </div>

                  <div class="alert alert-error" *ngIf="errorMessage">
                    <div class="alert-icon">✕</div>
                    <div class="alert-content">
                      <strong>Hata!</strong>
                      <p>{{errorMessage}}</p>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button 
                    type="submit" 
                    [disabled]="!contactForm.form.valid || isSubmitting"
                    class="btn-submit">
                    <span *ngIf="!isSubmitting" class="btn-content">
                      <span class="btn-icon">📤</span>
                      <span>Gönder</span>
                    </span>
                    <span *ngIf="isSubmitting" class="btn-loading">
                      <span class="spinner"></span>
                      <span>Gönderiliyor...</span>
                    </span>
                  </button>

                  <p class="form-note">
                    <span class="note-icon">🔒</span>
                    Bilgileriniz güvenli bir şekilde saklanır ve üçüncü şahıslarla paylaşılmaz.
                  </p>
                </form>
              </div>
            </div>

            <!-- Info Section -->
            <div class="info-section">
              <!-- Contact Info -->
              <div class="info-card">
                <div class="info-header">
                  <h3>İletişim Bilgileri</h3>
                  <p>Bize ulaşmanın diğer yolları</p>
                </div>

                <div class="contact-info-list">
                  <div class="info-item">
                    <div class="info-icon">📍</div>
                    <div class="info-content">
                      <div class="info-label">Adres</div>
                      <div class="info-value">İstanbul Türkiye</div>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon">📧</div>
                    <div class="info-content">
                      <div class="info-label">Email</div>
                      <div class="info-value">ajans.saglik1&#64;gmail.com</div>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon">📞</div>
                    <div class="info-content">
                      <div class="info-label">Telefon</div>
                      <div class="info-value">+90 532 659 92 77</div>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon">🕐</div>
                    <div class="info-content">
                      <div class="info-label">Çalışma Saatleri</div>
                      <div class="info-value">Hafta İçi: 09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Why Choose Us -->
              <div class="info-card features-card">
                <div class="info-header">
                  <h3>Neden Ajans Sağlık?</h3>
                </div>

                <div class="features-list">
                  <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-text">
                      <strong>Hızlı Yanıt</strong>
                      <span>24 saat içinde geri dönüş</span>
                    </div>
                  </div>

                  <div class="feature-item">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-text">
                      <strong>Uzman Kadro</strong>
                      <span>15+ yıl sektör deneyimi</span>
                    </div>
                  </div>

                  <div class="feature-item">
                    <div class="feature-icon">🔒</div>
                    <div class="feature-text">
                      <strong>Güvenli İşlem</strong>
                      <span>Tam gizlilik garantisi</span>
                    </div>
                  </div>

                  <div class="feature-item">
                    <div class="feature-icon">💼</div>
                    <div class="feature-text">
                      <strong>Profesyonel Destek</strong>
                      <span>A'dan Z'ye danışmanlık</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Trust Badge -->
              <div class="trust-badge">
                <div class="trust-icon">✓</div>
                <div class="trust-text">
                  <strong>150+</strong> başarılı işlem
                  <span>%100 müşteri memnuniyeti</span>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    
    </div>
  `,
  styles: [`
    .contact-page {
      min-height: 100vh;
      background: #f8fafc;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Hero Section */
    .page-hero {
      position: relative;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
      color: white;
      padding: 80px 20px;
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .hero-icon {
      font-size: 4rem;
      margin-bottom: 20px;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .page-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      margin-bottom: 16px;
    }

    .page-subtitle {
      font-size: 1.15rem;
      max-width: 700px;
      margin: 0 auto;
      opacity: 0.95;
      line-height: 1.7;
    }

    /* Content Grid */
    .contact-content {
      padding: 60px 20px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 40px;
      align-items: start;
    }

    /* Form Section */
    .form-section {
      width: 100%;
    }

    .form-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .form-header {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .form-header h2 {
      font-size: 1.8rem;
      margin-bottom: 8px;
      font-weight: 800;
    }

    .form-header p {
      opacity: 0.95;
      font-size: 1rem;
    }

    .contact-form {
      padding: 40px;
    }

    .form-group {
      margin-bottom: 28px;
    }

    .form-group.has-error .form-control {
      border-color: #ef4444;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      color: #1e293b;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .label-icon {
      font-size: 1.1rem;
    }

    .required {
      color: #ef4444;
      font-weight: 700;
    }

    .select-wrapper {
      position: relative;
    }

    .select-wrapper::after {
      content: '▼';
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #64748b;
      font-size: 0.8rem;
    }

    .form-control {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s;
      font-family: inherit;
    }

    select.form-control {
      appearance: none;
      cursor: pointer;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    .form-control.textarea {
      resize: vertical;
      min-height: 140px;
    }

    .error-message {
      margin-top: 8px;
      color: #ef4444;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .error-message::before {
      content: '⚠';
      font-size: 1rem;
    }

    /* Alerts */
    .alert {
      display: flex;
      gap: 16px;
      padding: 18px;
      border-radius: 12px;
      margin-bottom: 24px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .alert-success {
      background: #d1fae5;
      border: 2px solid #6ee7b7;
    }

    .alert-error {
      background: #fee2e2;
      border: 2px solid #fca5a5;
    }

    .alert-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .alert-success .alert-icon {
      background: #10b981;
      color: white;
    }

    .alert-error .alert-icon {
      background: #ef4444;
      color: white;
    }

    .alert-content {
      flex: 1;
    }

    .alert-content strong {
      display: block;
      margin-bottom: 4px;
      font-size: 1rem;
    }

    .alert-success .alert-content strong {
      color: #065f46;
    }

    .alert-error .alert-content strong {
      color: #991b1b;
    }

    .alert-content p {
      margin: 0;
      font-size: 0.95rem;
    }

    .alert-success .alert-content p {
      color: #047857;
    }

    .alert-error .alert-content p {
      color: #b91c1c;
    }

    /* Submit Button */
    .btn-submit {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-icon {
      font-size: 1.3rem;
    }

    .btn-loading {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .form-note {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      color: #64748b;
      text-align: center;
      justify-content: center;
    }

    .note-icon {
      font-size: 1rem;
    }

    /* Info Section */
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
      position: sticky;
      top: 20px;
    }

    .info-card {
      background: white;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .info-header {
      margin-bottom: 24px;
    }

    .info-header h3 {
      font-size: 1.4rem;
      color: #1e293b;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .info-header p {
      color: #64748b;
      font-size: 0.95rem;
    }

    .contact-info-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .info-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .info-content {
      flex: 1;
    }

    .info-label {
      font-size: 0.85rem;
      color: #64748b;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .info-value {
      font-size: 1rem;
      color: #1e293b;
      font-weight: 600;
    }

    /* Features Card */
    .features-card {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
    }

    .features-card .info-header h3 {
      color: white;
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .feature-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }

    .feature-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      backdrop-filter: blur(10px);
    }

    .feature-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .feature-text strong {
      font-size: 1rem;
      color: white;
    }

    .feature-text span {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    /* Trust Badge */
    .trust-badge {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%);
      border-radius: 16px;
      border: 2px solid #86efac;
    }

    .trust-icon {
      width: 50px;
      height: 50px;
      background: #10b981;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .trust-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: #065f46;
    }

    .trust-text strong {
      font-size: 1.4rem;
      font-weight: 800;
    }

    .trust-text span {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .info-section {
        position: static;
      }

      .contact-form {
        padding: 30px 20px;
      }
    }

    @media (max-width: 640px) {
      .page-hero {
        padding: 60px 20px;
      }

      .form-header {
        padding: 25px 20px;
      }

      .info-card {
        padding: 24px 20px;
      }
    }
    /* Social Sidebar */
.social-sidebar {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;
}

.social-icon {
  width: 44px;
  height: 44px;
  background: #a1a1aa; /* gri başlangıç */
  color: white;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 1.2rem;
  text-decoration: none;
}

.social-icon:hover {
  transform: translateX(-4px);
}

/* Sosyal medya renkleri */
.social-icon.facebook:hover { background: #1877f2; }
.social-icon.twitter:hover { background: #1da1f2; }
.social-icon.linkedin:hover { background: #0a66c2; }
.social-icon.instagram:hover { background: #e1306c; }

/* Küçük ekranlarda gizle */
@media (max-width: 768px) {
  .social-sidebar {
    display: none;
  }
}

  `]
})
export class ContactComponent implements OnInit {
  request: ContactRequest = {
    name: '',
    email: '',
    phone: '',
    requestType: RequestType.INFO,
    message: ''
  };

  requestTypes = [RequestType.BUY, RequestType.SELL, RequestType.INFO];
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
  private contactService: ContactService,
  private route: ActivatedRoute,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object,
  private seo: SeoService
) {}


  ngOnInit(): void {

  this.seo.update({
    title: 'İletişim | Ajans Sağlık – Sağlık Yatırımı ve Danışmanlık',
    description:
      'Ajans Sağlık ile iletişime geçin. Hastane alım satımı, sağlık tesisi devri ve yatırım danışmanlığı için uzman ekibimizle hemen iletişime geçin.',
    keywords:
      'ajans sağlık iletişim, sağlık danışmanlığı iletişim, hastane satışı iletişim, sağlık yatırımı'
  });

  this.route.queryParams.subscribe(params => {
    if (params['productId']) {
      this.request.productId = +params['productId'];
    }
    if (params['type'] === 'buy') {
      this.request.requestType = RequestType.BUY;
    } else if (params['type'] === 'sell') {
      this.request.requestType = RequestType.SELL;
    }
  });
}


  onSubmit(): void {
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.createContactRequest(this.request).subscribe({
      next: () => {
        this.successMessage = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
        this.isSubmitting = false;
        this.resetForm();
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        this.isSubmitting = false;
        console.error('İletişim formu hatası:', err);
      }
    });
  }

  resetForm(): void {
    this.request = {
      name: '',
      email: '',
      phone: '',
      requestType: RequestType.INFO,
      message: ''
    };
  }

  getRequestTypeName(type: RequestType): string {
    return REQUEST_TYPE_NAMES[type] || type;
  }
}