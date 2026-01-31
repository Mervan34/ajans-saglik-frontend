import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page">
      <!-- Hero Section -->
      <!-- <section class="hero">
        <div class="hero-background">
          <div class="hero-shape shape-1"></div>
          <div class="hero-shape shape-2"></div>
          <div class="hero-shape shape-3"></div>
        </div>
        <div class="hero-content container">
          <div class="hero-badge">
            <span class="badge-pulse"></span>
            <span>15 Yıllık Deneyim</span>
          </div>
          <h1 class="hero-title">
            Sağlık Sektöründe
            <span class="gradient-text">Güvenilir İş Ortağınız</span>
          </h1>
          <p class="hero-description">
            Profesyonel danışmanlık ve aracılık hizmetleriyle sağlık sektöründeki 
            başarı hikayenize ortak oluyoruz
          </p>
        </div>
      </section> -->

      <!-- Mission & Vision -->
      <section class="mission-vision">
        <div class="container">
          <div class="mv-grid">
            <div class="mv-card mission-card">
              <div class="mv-icon-wrapper">
                <div class="mv-icon">🎯</div>
                <div class="mv-icon-bg"></div>
              </div>
              <h2 class="mv-title">Misyonumuz</h2>
              <p class="mv-text">
                Ajan Sağlık olarak, sağlık sektöründe faaliyet gösteren kurumların ve yatırımcıların 
                ihtiyaçlarına profesyonel çözümler sunmaktayız. Hastane, tıp merkezi, poliklinik, 
                muayenehane gibi sağlık tesislerinin alım-satımında, devir işlemlerinde ve ruhsat 
                süreçlerinde güvenilir bir köprü görevi üstleniyoruz.
              </p>
            </div>

            <div class="mv-card vision-card">
              <div class="mv-icon-wrapper">
                <div class="mv-icon">🔭</div>
                <div class="mv-icon-bg"></div>
              </div>
              <h2 class="mv-title">Vizyonumuz</h2>
              <p class="mv-text">
                Sağlık sektöründe Türkiye'nin en güvenilir danışmanlık ve aracılık platformu olmak. 
                Her türlü sağlık tesisi alım-satım ve devir işleminde, şeffaf, yasal ve etik değerlere 
                bağlı kalarak hizmet vermek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">DEĞERLERİMİZ</span>
            <h2 class="section-title">Bizi Farklı Kılan Değerler</h2>
            <p class="section-description">
              İş ortaklıklarımızda ve hizmet anlayışımızda temel aldığımız prensipler
            </p>
          </div>

          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">✓</div>
              </div>
              <h3 class="value-title">Güvenilirlik</h3>
              <p class="value-text">
                Tüm işlemlerimizde şeffaflık ve dürüstlük ilkesiyle hareket ederiz
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">⚖️</div>
              </div>
              <h3 class="value-title">Profesyonellik</h3>
              <p class="value-text">
                Sektörün gerekliliklerini bilen uzman kadromuzla hizmet sunuyoruz
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">🤝</div>
              </div>
              <h3 class="value-title">Müşteri Odaklılık</h3>
              <p class="value-text">
                Her müşterimizin ihtiyacına özel çözümler üretiyoruz
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">🎯</div>
              </div>
              <h3 class="value-title">Sonuç Odaklılık</h3>
              <p class="value-text">
                Süreçleri başından sonuna kadar takip eder, sonuca odaklanırız
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">🔒</div>
              </div>
              <h3 class="value-title">Gizlilik</h3>
              <p class="value-text">
                Tüm bilgileriniz tam gizlilik ve güvenlik içinde korunur
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon-wrapper">
                <div class="value-icon">⚡</div>
              </div>
              <h3 class="value-title">Hızlı Çözüm</h3>
              <p class="value-text">
                Etkin süreç yönetimi ile zamanınızı en iyi şekilde değerlendiriyoruz
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-number">150+</div>
              <div class="stat-label">Başarılı İşlem</div>
              <div class="stat-bar"></div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-number">15 Yıl</div>
              <div class="stat-label">Sektör Deneyimi</div>
              <div class="stat-bar"></div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">🤝</div>
              <div class="stat-number">%100</div>
              <div class="stat-label">Müşteri Memnuniyeti</div>
              <div class="stat-bar"></div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">🌍</div>
              <div class="stat-number">81 İl</div>
              <div class="stat-label">Hizmet Ağı</div>
              <div class="stat-bar"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="why-us-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">AVANTAJLARIMIZ</span>
            <h2 class="section-title">Neden Bizi Seçmelisiniz?</h2>
          </div>

          <div class="why-us-grid">
            <div class="why-card">
              <div class="why-number">01</div>
              <h3 class="why-title">Sektör Uzmanlığı</h3>
              <p class="why-text">
                Sağlık sektörünün tüm dinamiklerini bilen deneyimli ekibimiz ile yanınızdayız
              </p>
            </div>

            <div class="why-card">
              <div class="why-number">02</div>
              <h3 class="why-title">Geniş Portföy</h3>
              <p class="why-text">
                Türkiye genelinde hastane, kadro, poliklinik ve ruhsat alternatifleri sunuyoruz
              </p>
            </div>

            <div class="why-card">
              <div class="why-number">03</div>
              <h3 class="why-title">Hukuki Güvence</h3>
              <p class="why-text">
                Tüm işlemlerinizi yasal çerçevede, sözleşmeli ve güvenceli şekilde gerçekleştiriyoruz
              </p>
            </div>

            <div class="why-card">
              <div class="why-number">04</div>
              <h3 class="why-title">Danışmanlık Desteği</h3>
              <p class="why-text">
                Sadece aracılık değil, tüm süreçte danışmanlık hizmeti veriyoruz
              </p>
            </div>

            <div class="why-card">
              <div class="why-number">05</div>
              <h3 class="why-title">Şeffaf Süreç</h3>
              <p class="why-text">
                Her aşamada detaylı bilgilendirme ve raporlama ile tam şeffaflık sağlıyoruz
              </p>
            </div>

            <div class="why-card">
              <div class="why-number">06</div>
              <h3 class="why-title">7/24 Destek</h3>
              <p class="why-text">
                İhtiyaç duyduğunuz her an ulaşabileceğiniz profesyonel destek ekibi
              </p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .about-page {
      background: #f8fafc;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Hero Section */
    .hero {
      position: relative;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 120px 20px 100px;
      overflow: hidden;
      color: white;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .hero-shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .shape-1 {
      width: 400px;
      height: 400px;
      top: -200px;
      right: -100px;
      animation: float 20s ease-in-out infinite;
    }

    .shape-2 {
      width: 300px;
      height: 300px;
      bottom: -150px;
      left: -50px;
      animation: float 15s ease-in-out infinite reverse;
    }

    .shape-3 {
      width: 200px;
      height: 200px;
      top: 50%;
      left: 10%;
      animation: float 10s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(50px, 50px) rotate(90deg);
      }
      50% {
        transform: translate(0, 100px) rotate(180deg);
      }
      75% {
        transform: translate(-50px, 50px) rotate(270deg);
      }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 10px 24px;
      border-radius: 50px;
      font-size: 0.9rem;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .badge-pulse {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse-dot 2s infinite;
    }

    @keyframes pulse-dot {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
      }
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin-bottom: 24px;
      line-height: 1.2;
    }

    .gradient-text {
      background: linear-gradient(135deg, #60efff 0%, #0061ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: clamp(1rem, 2vw, 1.25rem);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.8;
      opacity: 0.95;
    }

    /* Mission & Vision */
    .mission-vision {
      padding: 100px 20px;
      background: white;
    }

    .mv-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 40px;
    }

    .mv-card {
      padding: 48px;
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      transition: all 0.4s;
      position: relative;
      overflow: hidden;
    }

    .mv-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    }

    .mv-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
    }

    .mv-icon-wrapper {
      position: relative;
      width: 80px;
      height: 80px;
      margin-bottom: 28px;
    }

    .mv-icon {
      position: relative;
      z-index: 2;
      font-size: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mv-icon-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f2fe, #ddd6fe);
      border-radius: 20px;
      transform: rotate(-10deg);
      transition: transform 0.3s;
    }

    .mv-card:hover .mv-icon-bg {
      transform: rotate(10deg) scale(1.1);
    }

    .mv-title {
      font-size: 2rem;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .mv-text {
      color: #64748b;
      font-size: 1.1rem;
      line-height: 1.8;
    }

    /* Values Section */
    .values-section {
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
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      color: #1e293b;
      font-weight: 800;
      margin-bottom: 16px;
    }

    .section-description {
      color: #64748b;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .value-card {
      background: white;
      padding: 40px 30px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      text-align: center;
      transition: all 0.4s;
      border: 2px solid transparent;
    }

    .value-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
      border-color: #3b82f6;
    }

    .value-icon-wrapper {
      width: 70px;
      height: 70px;
      margin: 0 auto 24px;
      background: linear-gradient(135deg, #e0f2fe, #ddd6fe);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: transform 0.3s;
    }

    .value-card:hover .value-icon-wrapper {
      transform: scale(1.1) rotate(10deg);
    }

    .value-title {
      font-size: 1.3rem;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .value-text {
      color: #64748b;
      line-height: 1.7;
    }

    /* Stats Section */
    .stats-section {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      padding: 100px 20px;
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
    }

    .stat-card {
      text-align: center;
      padding: 40px 20px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s;
      position: relative;
      overflow: hidden;
    }

    .stat-card:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-8px);
    }

    .stat-icon {
      font-size: 3.5rem;
      margin-bottom: 20px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .stat-number {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 12px;
      line-height: 1;
    }

    .stat-label {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .stat-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #60efff, #0061ff);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s ease;
    }

    .stat-card:hover .stat-bar {
      transform: scaleX(1);
    }

    /* Why Us Section */
    .why-us-section {
      padding: 100px 20px;
      background: white;
    }

    .why-us-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .why-card {
      padding: 40px;
      background: #f8fafc;
      border-radius: 20px;
      border: 2px solid #e2e8f0;
      transition: all 0.4s;
      position: relative;
    }

    .why-card:hover {
      background: white;
      border-color: #3b82f6;
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    }

    .why-number {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 3rem;
      font-weight: 800;
      color: #e2e8f0;
      line-height: 1;
      transition: color 0.3s;
    }

    .why-card:hover .why-number {
      color: #3b82f6;
    }

    .why-title {
      font-size: 1.4rem;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .why-text {
      color: #64748b;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    /* CTA Section */
    .cta-section {
      padding: 100px 20px;
      background: #f8fafc;
    }

    .cta-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
      padding: 80px 60px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 32px;
      color: white;
      box-shadow: 0 24px 48px rgba(16, 185, 129, 0.2);
    }

    .cta-icon {
      font-size: 4rem;
      margin-bottom: 24px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }

    .cta-title {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      margin-bottom: 20px;
      line-height: 1.3;
    }

    .cta-description {
      font-size: 1.25rem;
      opacity: 0.95;
      line-height: 1.8;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero {
        padding: 80px 20px 60px;
      }

      .mv-grid {
        grid-template-columns: 1fr;
      }

      .values-grid,
      .why-us-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .cta-content {
        padding: 60px 30px;
      }
    }

    @media (max-width: 768px) {

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .stat-card {
    padding: 24px 14px;
  }

  .stat-number {
    font-size: 2.4rem;   /* 3.5rem → küçült */
    line-height: 1.1;
  }

  .stat-label {
    font-size: 0.95rem;
    line-height: 1.4;
    white-space: normal;   /* EN KRİTİK SATIR */
    word-break: break-word;
  }

  .why-number {
    font-size: 2rem;
    top: 12px;
    right: 12px;
    opacity: 0.15;
  }

  .why-title,
  .why-text {
    position: relative;
    z-index: 2;
  }
}

    
  `]
})
export class AboutComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Hakkımızda | Ajans Sağlık – Sağlık Sektöründe 15 Yıllık Deneyim',
      description:
        'Ajans Sağlık, hastane alım satımı, sağlık tesisi devri ve yatırım danışmanlığı alanlarında 15 yıllık tecrübesiyle güvenilir ve profesyonel çözümler sunar.',
      keywords:
        'ajans sağlık, hakkımızda, sağlık danışmanlığı, hastane devri, sağlık yatırımı, tıp merkezi satışı'
    });
  }
}