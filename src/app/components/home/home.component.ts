import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Slider Section -->
    <div class="hero-slider">
      <div class="slider-container">
        <div class="slide" 
             *ngFor="let slide of slides; let i = index"
             [class.active]="currentSlide === i"
             [style.background-image]="'url(' + slide.image + ')'">
          <div class="slide-overlay"></div>
          <div class="slide-content container">
            <div class="slide-badge">
              <span class="badge-icon">✓</span>
              <span>{{slide.badge}}</span>
            </div>
            <h1 class="slide-title" [innerHTML]="slide.title"></h1>
            <p class="slide-subtitle">{{slide.subtitle}}</p>
            <div class="slide-cta">
              <button class="btn-slide-primary" routerLink="/iletisim">
                {{slide.cta}}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slider-nav">
        <button class="nav-btn prev" (click)="prevSlide()">‹</button>
        <button class="nav-btn next" (click)="nextSlide()">›</button>
      </div>
      
      <div class="slider-dots">
        <button 
          *ngFor="let slide of slides; let i = index"
          class="dot"
          [class.active]="currentSlide === i"
          (click)="goToSlide(i)">
        </button>
      </div>
    </div>

    <div class="trust-bar">
      <div class="container">
        <div class="trust-indicators">
          <div class="indicator">
            <div class="indicator-icon">🏆</div>
            <div class="indicator-content">
              <div class="indicator-number">150+</div>
              <div class="indicator-label">Başarılı İşlem</div>
            </div>
          </div>
          <div class="indicator">
            <div class="indicator-icon">⭐</div>
            <div class="indicator-content">
              <div class="indicator-number">15 Yıl</div>
              <div class="indicator-label">Sektör Deneyimi</div>
            </div>
          </div>
          <div class="indicator">
            <div class="indicator-icon">🤝</div>
            <div class="indicator-content">
              <div class="indicator-number">%100</div>
              <div class="indicator-label">Müşteri Memnuniyeti</div>
            </div>
          </div>
          <div class="indicator">
            <div class="indicator-icon">🔒</div>
            <div class="indicator-content">
              <div class="indicator-number">Tam</div>
              <div class="indicator-label">Gizlilik Garantisi</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="services-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">HİZMETLERİMİZ</span>
          <h2>Sağlık Sektöründe Kapsamlı Çözümler</h2>
          <p class="section-description">
            Her büyüklükteki sağlık yatırımında profesyonel danışmanlık ve aracılık hizmeti sunuyoruz
          </p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🏥</div>
            <h3>Hastane Alım-Satım</h3>
            <p>Özel hastane alım-satım süreçlerinde A'dan Z'ye danışmanlık, değerleme ve aracılık hizmetleri</p>
            <ul class="service-features">
              <li>Pazar Değerleme Analizi</li>
              <li>Hukuki Süreç Yönetimi</li>
              <li>Alıcı/Satıcı Eşleştirme</li>
            </ul>
            <button class="service-btn" routerLink="/iletisim">Detaylı Bilgi →</button>
          </div>

          <div class="service-card">
            <div class="service-icon">👨‍⚕️</div>
            <h3>Hastane Kadrosu</h3>
            <p>Uzman ve yan dal kadro alım-satım işlemlerinde güvenilir aracılık</p>
            <ul class="service-features">
              <li>Kadro Değerleme</li>
              <li>Devir İşlemleri</li>
              <li>Sözleşme Hazırlama</li>
            </ul>
            <button class="service-btn" routerLink="/iletisim">Detaylı Bilgi →</button>
          </div>

          <div class="service-card">
            <div class="service-icon">🏢</div>
            <h3>Devirli Poliklinik</h3>
            <p>Fizik tedavi ve diğer poliklinik ruhsat devir işlemlerinde uzman destek</p>
            <ul class="service-features">
              <li>Ruhsat Analizi</li>
              <li>Lokasyon Değerlendirme</li>
              <li>Devir Süreci Yönetimi</li>
            </ul>
            <button class="service-btn" routerLink="/iletisim">Detaylı Bilgi →</button>
          </div>

          <div class="service-card">
            <div class="service-icon">📋</div>
            <h3>Tıp Merkezi Ruhsatı</h3>
            <p>Tıp merkezi ruhsatlarının alım-satımında profesyonel danışmanlık</p>
            <ul class="service-features">
              <li>Ruhsat Uygunluk Kontrolü</li>
              <li>Değer Tespiti</li>
              <li>İşlem Takibi</li>
            </ul>
            <button class="service-btn" routerLink="/iletisim">Detaylı Bilgi →</button>
          </div>
        </div>
      </div>
    </div>

    <div class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">MÜŞTERİ GÖRÜŞLERİ</span>
          <h2>Müşterilerimiz Ne Diyor?</h2>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Hastane satış sürecinde Ajans Sağlık'ın profesyonel yaklaşımı ve şeffaflığı bizi çok etkiledi. 
              Her aşamada yanımızda oldular ve en iyi anlaşmayı yapmamızı sağladılar."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">👨‍⚕️</div>
              <div class="author-info">
                <div class="author-name">Dr. Mehmet Y.</div>
                <div class="author-role">Özel Hastane Sahibi</div>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Kadro devir işlemimizde hukuki süreç yönetiminden finansal danışmanlığa kadar 
              her konuda destek aldık. Kesinlikle tavsiye ediyorum."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">👩‍⚕️</div>
              <div class="author-info">
                <div class="author-name">Uzm. Dr. Ayşe K.</div>
                <div class="author-role">Tıp Merkezi Sahibi</div>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">
              "Sağlık sektöründe yatırım yapmak isteyenler için ideal bir platform. 
              Güvenilir, şeffaf ve sonuç odaklı çalışıyorlar."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">👔</div>
              <div class="author-info">
                <div class="author-name">Ahmet S.</div>
                <div class="author-role">Yatırımcı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="why-us-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">NEDEN BİZ?</span>
          <h2>Ajans Sağlık Farkı</h2>
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h4>Gizlilik Garantisi</h4>
            <p>Tüm işlemleriniz tam gizlilik ve güvenlik içinde yürütülür</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚖️</div>
            <h4>Hukuki Destek</h4>
            <p>Deneyimli hukuk ekibimizle her aşamada yanınızdayız</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💰</div>
            <h4>Değer Maksimizasyonu</h4>
            <p>Yatırımınızın gerçek değerini tespit eder, en iyi anlaşmayı sağlarız</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🤝</div>
            <h4>Güvenilir Ağ</h4>
            <p>Sektördeki geniş iletişim ağımızla doğru alıcı/satıcıyı buluruz</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .hero-slider {
  position: relative;
  height: 85vh;
  max-height: 650px;
  overflow: hidden;
}

    .slider-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1.5s ease-in-out;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .slide.active {
      opacity: 1;
      z-index: 1;
    }

    .slide-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  background: rgba(0, 0, 0, 0.2); /* çok hafif siyah ton */
    }

    .slide-content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
      padding: 40px 20px;
    }

    .slide-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  animation: fadeInDown 0.8s ease-out;
}

    .badge-icon {
      background: #10b981;
      color: white;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }

    .slide-title {
  font-size: clamp(1.8rem, 4.5vw, 2.8rem);
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
  max-width: 900px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

    .slide-subtitle {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  margin-bottom: 24px;
  max-width: 650px;
  line-height: 1.6;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

    .slide-cta {
      animation: fadeInUp 0.8s ease-out 0.6s both;
    }

    .btn-slide-primary {
  padding: 14px 36px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
}

    .btn-slide-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(16, 185, 129, 0.5);
    }

    .slider-nav {
      position: absolute;
      top: 50%;
      left: 40px;
      right: 40px;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 10;
      pointer-events: none;
    }

    .nav-btn {
      pointer-events: all;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .slider-dots {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 10;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      border: none;
      cursor: pointer;
      transition: all 0.3s;
    }

    .dot.active {
      background: white;
      width: 32px;
      border-radius: 6px;
    }

    .dot:hover {
      background: rgba(255, 255, 255, 0.7);
    }

    .trust-bar {
      background: white;
      padding: 40px 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .trust-indicators {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .indicator {
      display: flex;
      align-items: center;
      gap: 20px;
      justify-content: center;
    }

    .indicator-icon {
      font-size: 3rem;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }

    .indicator-content {
      text-align: left;
    }

    .indicator-number {
      font-size: 2rem;
      font-weight: 800;
      color: #1e40af;
      line-height: 1;
      margin-bottom: 4px;
    }

    .indicator-label {
      font-size: 0.9rem;
      color: #64748b;
      font-weight: 500;
    }

    .services-section {
      padding: 100px 20px;
      background: #f8fafc;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-badge {
      display: inline-block;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .section-header h2 {
      font-size: clamp(2rem, 4vw, 2.75rem);
      color: #1e293b;
      margin-bottom: 16px;
      font-weight: 800;
    }

    .section-description {
      color: #64748b;
      font-size: 1.1rem;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .service-card {
      background: white;
      padding: 40px 30px;
      border-radius: 20px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.06);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #f1f5f9;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      transform: scaleX(0);
      transition: transform 0.4s;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      border-color: #3b82f6;
    }

    .service-card:hover::before {
      transform: scaleX(1);
    }

    .service-icon {
      font-size: 3.5rem;
      margin-bottom: 24px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }

    .service-card h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      font-weight: 700;
      color: #1e293b;
    }

    .service-card p {
      color: #64748b;
      line-height: 1.7;
      margin-bottom: 24px;
      flex: 1;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 20px 0 24px 0;
    }

    .service-features li {
      padding: 12px 0;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.95rem;
      transition: color 0.3s;
    }

    .service-features li:last-child {
      border-bottom: none;
    }

    .service-features li:before {
      content: "✓ ";
      color: #10b981;
      font-weight: bold;
      margin-right: 10px;
    }

    .service-btn {
      margin-top: auto;
      padding: 14px 28px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .service-btn:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
    }

    .testimonials-section {
      padding: 100px 20px;
      background: white;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .testimonial-card {
      background: #f8fafc;
      padding: 35px;
      border-radius: 20px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      border-color: #3b82f6;
    }

    .testimonial-rating {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: #fbbf24;
    }

    .testimonial-text {
      color: #475569;
      line-height: 1.8;
      margin-bottom: 24px;
      font-style: italic;
      font-size: 1rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .author-avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .author-name {
      font-weight: 700;
      color: #1e293b;
      font-size: 1rem;
    }

    .author-role {
      font-size: 0.85rem;
      color: #64748b;
    }

    .why-us-section {
      padding: 100px 20px;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-item {
      text-align: center;
      padding: 40px 30px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s;
    }

    .feature-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-8px);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .feature-icon {
      font-size: 3.5rem;
      margin-bottom: 24px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .feature-item h4 {
      font-size: 1.4rem;
      margin-bottom: 14px;
      font-weight: 700;
    }

    .feature-item p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.7;
      font-size: 1rem;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero-slider {
    height: 400px
  }

  .slide-title {
    font-size: 1.5rem;
    margin-bottom:12px;
  }

  .slide-subtitle {
    font-size: 0.9rem;
    margin-bottom:20px;
  }
  
  .slide-badge{
    padding: 6px 16px;
font-size: 0.8rem;
margin-bottom: 16px;
  }

      .trust-indicators {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .indicator {
        flex-direction: column;
        text-align: center;
      }

      .indicator-content {
        text-align: center;
      }

      .services-grid,
      .features-grid,
      .testimonials-grid {
        grid-template-columns: 1fr;
      }

      .nav-btn {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }

      .slider-nav {
        padding: 0 10px;
      }
    }

    @media (max-width: 450px) {
      .hero-slider {
    height: 65vh;
    max-height: 450px;
  }

  .trust-indicators {
    grid-template-columns: 1fr;
  }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private slideInterval: any;

  constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private zone: NgZone,
  private seo: SeoService
) {}
slides = [
    {
      image: 'assets/images/1.jpg',
      badge: 'Türkiye\'nin Güvenilir Sağlık Danışmanlık Platformu',
      title: 'Sağlık Sektöründe<br><span style="color: #60e fff">Profesyonel Alım-Satım Çözümleri</span>',
      subtitle: 'Hastanenizi, ruhsatınızı veya kadrolarınızı güvenle alıp satın. 15 yıllık deneyimimizle yanınızdayız.',
      cta: 'Ücretsiz Değerlendirme Alın'
    },
    {
      image: 'assets/images/4.jpg',
      badge: 'Türkiye\'nin Güvenilir Sağlık Danışmanlık Platformu',
      title: 'Sağlık Sektöründe<br><span style="color: #60e fff">Profesyonel Alım-Satım Çözümleri</span>',
      subtitle: 'Hastanenizi, ruhsatınızı veya kadrolarınızı güvenle alıp satın. 15 yıllık deneyimimizle yanınızdayız.',
      cta: 'Ücretsiz Değerlendirme Alın'
    },
    {
      image: 'assets/images/2.jpg',
      badge: '150+ Başarılı İşlem',
      title: 'Hastane Alım-Satımında<br><span style="color: #60efff">Güvenilir İş Ortağınız</span>',
      subtitle: 'Pazar değerleme, hukuki süreç yönetimi ve alıcı-satıcı eşleştirme hizmetleriyle tam destek.',
      cta: 'Portföyü İnceleyin'
    },
    {
      image: 'assets/images/3.jpg',
      badge: '%100 Müşteri Memnuniyeti',
      title: 'Kadro ve Ruhsat<br><span style="color: #60efff">Devir İşlemlerinde Uzman</span>',
      subtitle: 'Tüm sağlık yatırımlarınızda şeffaf, hızlı ve profesyonel hizmet garantisi.',
      cta: 'Hemen Başlayın'
    }
  ];

ngOnInit() {
  this.seo.update({
    title: 'Ajans Sağlık | Hastane Alım Satım & Sağlık Yatırım Danışmanlığı',
    description:
      'Ajans Sağlık, hastane alım satımı, kadro ve ruhsat devri, sağlık yatırımı danışmanlığı alanlarında 15 yıllık tecrübesiyle profesyonel çözümler sunar.',
    keywords:
      'hastane alım satım, sağlık yatırımı, tıp merkezi ruhsatı, sağlık danışmanlığı, özel hastane satışı'
  });

  if (isPlatformBrowser(this.platformId)) {
    this.startAutoSlide();
  }
}



  ngOnDestroy() {
  if (this.slideInterval) {
    clearInterval(this.slideInterval);
  }
}

startAutoSlide() {
  this.zone.runOutsideAngular(() => {
    this.slideInterval = setInterval(() => {
      this.zone.run(() => {
        this.nextSlide();
      });
    }, 5000);
  });
}
  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}