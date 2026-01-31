import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../core/seo/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="services-page">
      <!-- Hero Section -->
      <section class="hero">
        <!-- <div class="hero-background"></div> -->
        <!-- <div class="hero-content container">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>Profesyonel Danışmanlık Hizmetleri</span>
          </div>
          <h1 class="hero-title">
            Sağlık Sektöründe
            <span class="gradient-text">Kapsamlı Çözümler</span>
          </h1>
          <p class="hero-description">
            Sağlık Bakanlığı mevzuatına uygun açılış, ruhsatlandırma, taşınma, tadilat ve devir işlemlerinde
            sürecin en başından sonuna kadar yanınızdayız
          </p>
        </div> -->
        <!-- <div class="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div> -->
      </section>

      <!-- Services Grid -->
      <section class="services-section">
        <div class="container">
          <div class="services-grid">
            
            <!-- Service 1 -->
            <article class="service-card" [class.open]="expandedIndex === 1">
              <div class="service-header" (click)="toggleCard(1)">
                <div class="service-icon-wrapper">
                  <div class="service-icon">🏥</div>
                  <div class="icon-bg"></div>
                </div>
                <div class="service-number">01</div>
              </div>
              <h2 class="service-title">Sağlık Kurumu Açılış ve Ruhsatlandırma</h2>
              <p class="service-description">
                Yeni bir sağlık kuruluşu açmak ciddi planlama ve yasal uyum gerektirir. 
                Fikir aşamasından açılış onayına kadar tüm adımları sizin adınıza yönetiyoruz.
              </p>
              
              <div class="service-process">
                <h3 class="process-title">Danışmanlık Sürecimiz</h3>
                <ul class="process-list">
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Kurum türü ve hedefe göre ön analiz</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Yönetmeliklere göre uygun yer ve mimari planlama</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Ruhsat dosyası hazırlama ve başvuru</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Teknik şartname uygunluk kontrolleri</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Denetim süreçlerinin takibi</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Açılış izninin alınması</span>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Service 2 -->
            <article class="service-card" [class.open]="expandedIndex === 2">
              <div class="service-header" (click)="toggleCard(2)">
                <div class="service-icon-wrapper">
                  <div class="service-icon">🧾</div>
                  <div class="icon-bg"></div>
                </div>
                <div class="service-number">02</div>
              </div>
              <h2 class="service-title">Ruhsat Devir ve Yerinde Devralma</h2>
              <p class="service-description">
                Mevcut ruhsatlı bir sağlık kurumunu devralmak, birçok yasal prosedür ve inceleme gerektirir. 
                Bu süreçte tüm teknik, hukuki ve idari adımları sizin adınıza yürütüyoruz.
              </p>
              
              <div class="service-process">
                <h3 class="process-title">Süreç Adımlarımız</h3>
                <ul class="process-list">
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Mevcut ruhsat ve kurum durumu incelemesi</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Devir sözleşmesi hazırlığı</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Yerinde keşif ve uygunluk raporu</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Bakanlık onaylı devir başvurusu</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Yeni ruhsat düzenleme işlemleri</span>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Service 3 -->
            <article class="service-card" [class.open]="expandedIndex === 3">
              <div class="service-header" (click)="toggleCard(3)">
                <div class="service-icon-wrapper">
                  <div class="service-icon">🏗️</div>
                  <div class="icon-bg"></div>
                </div>
                <div class="service-number">03</div>
              </div>
              <h2 class="service-title">Tadilat, Branş Ekleme ve Kapasite Artırımı</h2>
              <p class="service-description">
                Mevcut sağlık kuruluşlarında yeni birim ekleme, fiziki değişiklik, kapasite artırımı 
                veya branş genişletme planlıyorsanız, mevzuata uygun tüm proje ve izin süreçlerinde 
                size rehberlik ediyoruz.
              </p>
              
              <div class="service-process">
                <h3 class="process-title">Danışmanlık Aşamaları</h3>
                <ul class="process-list">
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Proje ve ihtiyaç analizi</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Bakanlık kriterlerine göre çizim desteği</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>İzin dosyası hazırlama ve takip</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Tadilat sonrası denetim hazırlığı</span>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Service 4 -->
            <article class="service-card" [class.open]="expandedIndex === 4">
              <div class="service-header" (click)="toggleCard(4)">
                <div class="service-icon-wrapper">
                  <div class="service-icon">📜</div>
                  <div class="icon-bg"></div>
                </div>
                <div class="service-number">04</div>
              </div>
              <h2 class="service-title">Mevzuat Uyum ve Denetim Hazırlığı</h2>
              <p class="service-description">
                Sağlık kurumlarının periyodik denetimlere tam hazırlıklı olması, faaliyetlerin 
                kesintisiz sürmesi açısından çok önemlidir. Bu nedenle mevzuata uygunluk denetimi 
                ve eğitim desteği sağlıyoruz.
              </p>
              
              <div class="service-process">
                <h3 class="process-title">Hizmet Kapsamı</h3>
                <ul class="process-list">
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Güncel yönetmeliklerin uygulanabilirlik analizi</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Eksikliklerin tespiti ve çözüm önerileri</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Denetim öncesi saha hazırlığı</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Denetim sonrası süreç takibi</span>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Service 5 -->
            <article class="service-card" [class.open]="expandedIndex === 5">
              <div class="service-header" (click)="toggleCard(5)">
                <div class="service-icon-wrapper">
                  <div class="service-icon">🧩</div>
                  <div class="icon-bg"></div>
                </div>
                <div class="service-number">05</div>
              </div>
              <h2 class="service-title">Sürekli Danışmanlık ve Mevzuat Takibi</h2>
              <p class="service-description">
                Sağlık sektöründe mevzuatlar sık sık güncellenmektedir. Danışan kurumlarımızın 
                her zaman güncel kalmasını sağlıyoruz.
              </p>
              
              <div class="service-process">
                <h3 class="process-title">Bu Kapsamda</h3>
                <ul class="process-list">
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Mevzuat değişikliklerinin düzenli takibi</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Kurum özelinde bilgilendirme ve yönlendirme</span>
                  </li>
                  <li>
                    <span class="process-icon">✓</span>
                    <span>Hızlı aksiyon desteği</span>
                  </li>
                </ul>
              </div>
            </article>

            <!-- Service 6 -->
<article class="service-card" [class.open]="expandedIndex === 6">
  <div class="service-header" (click)="toggleCard(6)">
    <div class="service-icon-wrapper">
      <div class="service-icon">💻</div>
      <div class="icon-bg"></div>
    </div>
    <div class="service-number">06</div>
  </div>

  <h2 class="service-title">
    Dijital Kurumsal Web Hizmetleri
  </h2>

  <p class="service-description">
    Sağlık sektörüne özel, güven veren, hızlı ve SEO uyumlu web siteleri
    tasarlıyor ve yayına alıyoruz. Dijitalde güçlü bir kurumsal kimlik
    oluşturmanızı sağlıyoruz.
  </p>

  <div class="service-process">
    <h3 class="process-title">Hizmet İçeriği</h3>
    <ul class="process-list">
      <li>
        <span class="process-icon">✓</span>
        <span>Doktor & hastane odaklı özel UI/UX tasarım</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>Mobil uyumlu (Responsive) modern arayüz</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>SEO altyapısı (Google uyumlu sayfa yapısı)</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>Yüksek hız & performans optimizasyonu</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>KVKK ve sağlık sektörüne uygun içerik yapısı</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>Alan adı (domain) & hosting danışmanlığı</span>
      </li>
      <li>
        <span class="process-icon">✓</span>
        <span>Yayına alma ve teknik destek</span>
      </li>
    </ul>
  </div>
</article>


          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits-section">
        <div class="container">
          <div class="section-header">
            <span class="section-badge">AVANTAJLARIMIZ</span>
            <h2 class="section-title">Biz Ne Sağlıyoruz?</h2>
          </div>
          
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h3>Zaman Tasarrufu</h3>
              <p>Profesyonel süreç yönetimi ile zaman kaybını önlüyoruz</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📋</div>
              <h3>Eksiksiz Başvuru</h3>
              <p>Doğru belge hazırlığı, eksiksiz başvuru</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">💼</div>
              <h3>Etkin İletişim</h3>
              <p>Sağlık Bakanlığı'nda etkin iletişim</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🇹🇷</div>
              <h3>Türkiye Geneli</h3>
              <p>Türkiye genelinde yerinde danışmanlık</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📊</div>
              <h3>Şeffaf Raporlama</h3>
              <p>Her aşamada şeffaf bilgilendirme</p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  `,
  styles: [`
    * 
    {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* --- AÇILIR KAPANIR OK --- */
.toggle-arrow {
  width: 22px;
  height: 22px;
  border-right: 3px solid #64748b;
  border-bottom: 3px solid #64748b;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  cursor: pointer;
  opacity: 0.8;
}

/* Açılınca ok yön değiştirsin */
.service-card.open .toggle-arrow {
  transform: rotate(225deg);
}

/* --- TIKLANABİLİR ALAN SADECE HEADER OLSUN --- */
.service-header {
  cursor: pointer;
  padding: 6px 0;
  user-select: none;
}

/* Body kısmına tıklayınca açılmasın */
.service-card > *:not(.service-header) {
  pointer-events: none;
}

/* --- AÇILIR KAPANIR ANİMASYON --- */
.service-process {
  max-height: 0;
  overflow: hidden;
  padding: 0 28px;
  opacity: 0;
  transition: all 0.35s ease;
}

.service-card.open .service-process {
  max-height: 800px;
  padding: 28px;
  opacity: 1;
}

/* Description da aynı şekilde */
.service-description {
  max-height: 0;
  overflow: hidden;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.service-card.open .service-description {
  max-height: 400px;
  opacity: 1;
}


    .services-page {
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
      background:none;
      padding: 0 20px 180px;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      animation: pulse 15s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      color: white;
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

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: blink 2s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
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
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.8;
      opacity: 0.95;
    }

    .hero-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .hero-wave svg {
      display: block;
      width: 100%;
      height: auto;
    }

    /* Services Section */
    .services-section {
      padding: 80px 20px;
      margin-top: -60px;
    }

    .services-grid {
      display: grid;
      gap: 40px;
    }

    .service-card {
      background: white;
      border-radius: 16px 18px;
      padding: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid #e2e8f0;
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
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s ease;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
    }

    .service-card:hover::before {
      transform: scaleX(1);
    }

    .service-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .service-icon-wrapper {
      position: relative;
      width: 32px;
      height: 32px;
    }

    .service-icon {
      position: relative;
      z-index: 2;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e0f2fe, #ddd6fe);
      border-radius: 20px;
      transform: rotate(-5deg);
      transition: transform 0.3s;
    }

    .service-card:hover .icon-bg {
      transform: rotate(5deg) scale(1.1);
    }

    .service-number {
      font-size: 2.2rem;
      font-weight: 800;
      color: #f1f5f9;
      line-height: 1;
    }

    .service-title {
      font-size: 1.2rem;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .service-description {
      color: #64748b;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .service-process {
      background: #f8fafc;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    }

    .process-title {
      font-size: 1.1rem;
      color: #3b82f6;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .process-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .process-list li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 6px 0;
      color: #475569;
      font-size: 0.9rem;
      line-height: 1.6;
      border-bottom: 1px solid #e2e8f0;
    }

    .process-list li:last-child {
      border-bottom: none;
    }

    .process-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
    }

    /* Benefits Section */
    .benefits-section {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      padding: 100px 20px;
      color: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      margin-bottom: 16px;
    }

    .benefits-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 kart yan yana */
  gap: 30px;
  justify-items: center;  /* Kartları hücrelerinde ortala */
}

    .benefit-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 20px 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.4s;
  width: 100%;            /* Hücreyi doldur */
  max-width: 250px;       /* Kartın maksimum genişliği */
  box-sizing: border-box;  /* Padding ve border’ı genişliğe dahil et */
}
    .benefit-card:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-8px);
    }

    .benefit-icon {
      font-size: 3.5rem;
      margin-bottom: 24px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .benefit-card h3 {
      font-size: 1.3rem;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .benefit-card p {
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      padding: 100px 20px;
      background: white;
    }

    .cta-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      padding: 80px 60px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 32px;
      color: white;
      box-shadow: 0 24px 48px rgba(16, 185, 129, 0.2);
    }

    .cta-content h2 {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      margin-bottom: 20px;
      font-weight: 800;
    }

    .cta-content p {
      font-size: 1.25rem;
      opacity: 0.95;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero {
        padding: 80px 20px 140px;
      }

      .service-card {
        padding: 32px 24px;
      }

      .service-header {
        flex-direction: column;
        gap: 20px;
      }

      .service-number {
        font-size: 3rem;
      }

      .cta-content {
        padding: 60px 30px;
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent implements OnInit {
  expandedIndex: number | null = null; toggleCard(index: number) { this.expandedIndex = this.expandedIndex === index ? null : index; }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SeoService
  ) { }

  private setSeo(): void {
    this.seo.update({
      title: 'Sağlık Kurumu Açılış, Ruhsat ve Danışmanlık Hizmetleri | Ajans Sağlık',
      description: `
Sağlık kurumu açılış, ruhsatlandırma, devir, tadilat ve mevzuat danışmanlığı hizmetleri.
Türkiye genelinde Sağlık Bakanlığı uyumlu profesyonel danışmanlık.
    `.trim(),
      keywords: `
      sağlık danışmanlığı,
      sağlık kurumu açılışı,
      hastane ruhsat işlemleri,
      klinik açma danışmanlığı,
      sağlık bakanlığı ruhsat,
      sağlık mevzuatı danışmanlığı,
      ajans sağlık
    `
    });
  }

  ngOnInit(): void {
    this.expandedIndex = 1; 
    this.setSeo();
  }


}