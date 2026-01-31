import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-duyurular',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="announcements-page">

      <!-- Header -->
      <section class="page-header">
        <div class="container">
          <div class="header-badge">T.C. Sağlık Bakanlığı</div>
          <h1 class="page-title">Resmî Sağlık Duyuruları</h1>
          <p class="page-subtitle">
            Sağlık Bakanlığı tarafından yayımlanan güncel, doğrulanmış ve resmî
            duyurulara Ajans Sağlık aracılığıyla güvenle erişebilirsiniz.
          </p>
        </div>
      </section>

      <!-- Content -->
      <section class="content">
        <div class="container">

          <div class="announcement-panel">
            <div class="panel-header">
              <span class="panel-indicator"></span>
              <h2>Sağlık Bakanlığı Duyuruları</h2>
            </div>

            <p class="panel-text">
              Sağlık sektörüne ilişkin mevzuat değişiklikleri, genelgeler, resmî
              ilanlar ve kamuoyu bilgilendirmeleri
              <strong>T.C. Sağlık Bakanlığı</strong> tarafından yayımlanmaktadır.
            </p>

            <div class="info-box">
              <div class="info-line"></div>
              <div class="info-content">
                <strong>Bilgilendirme</strong>
                <span>
                  Bağlantı sizi Sağlık Bakanlığı’nın resmî internet sitesine yönlendirir
                  ve yeni sekmede açılır.
                </span>
              </div>
            </div>

            <button class="redirect-btn" (click)="goToMinistry()">
              Resmî Duyurulara Git
            </button>
          </div>

          <!-- Trust -->
          <div class="trust-section">
            <div class="trust-item">
              <span class="dot"></span>
              <span>Resmî ve doğrulanmış kaynak</span>
            </div>
            <div class="trust-item">
              <span class="dot"></span>
              <span>Güncel mevzuat ve duyurular</span>
            </div>
            <div class="trust-item">
              <span class="dot"></span>
              <span>Kamu kurumu yönlendirmesi</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  `,
  styles: [`
    :root {
      --primary: #0f172a;
      --secondary: #1e293b;
      --accent: #2563eb;
      --muted: #64748b;
      --bg: #f8fafc;
      --border: #e2e8f0;
    }

    .announcements-page {
      min-height: 100vh;
      background: var(--bg);
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* HEADER */
    .page-header {
      background:
        linear-gradient(135deg, #1e3a5f 0%, #2f8a7f 100%);
      color: #fff;
      padding: 90px 20px 80px;
      text-align: center;
    }

    .header-badge {
      display: inline-block;
      border: 1px solid rgba(255,255,255,0.25);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.75rem;
      letter-spacing: 0.6px;
      margin-bottom: 18px;
      opacity: 0.85;
    }

    .page-title {
      font-size: clamp(2.2rem, 4vw, 3rem);
      font-weight: 800;
      margin-bottom: 14px;
    }

    .page-subtitle {
      max-width: 760px;
      margin: 0 auto;
      font-size: 1.05rem;
      line-height: 1.7;
      color: #cbd5f5;
    }

    /* CONTENT */
    .content {
      padding: 70px 20px;
    }

    .announcement-panel {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 42px;
      box-shadow: 0 12px 40px rgba(15,23,42,0.06);
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 18px;
    }

    .panel-indicator {
      width: 6px;
      height: 42px;
      background: var(--accent);
      border-radius: 6px;
    }

    .announcement-panel h2 {
      font-size: 1.55rem;
      font-weight: 700;
      color: var(--primary);
    }

    .panel-text {
      font-size: 1rem;
      line-height: 1.75;
      color: var(--muted);
      margin-bottom: 28px;
    }

    /* INFO */
    .info-box {
      display: flex;
      gap: 14px;
      background: #f1f5f9;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 34px;
    }

    .info-line {
      width: 4px;
      background: var(--accent);
      border-radius: 4px;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.95rem;
      color: #334155;
    }

    /* BUTTON */
    .redirect-btn {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 16px 36px;
      border-radius: 14px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .redirect-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px rgba(37,99,235,0.35);
    }

    /* TRUST */
    .trust-section {
      margin-top: 50px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .trust-item {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 14px 18px;
      border-radius: 12px;
      font-size: 0.9rem;
      color: var(--primary);
      font-weight: 600;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .announcement-panel {
        padding: 30px 22px;
      }
      .trust-section {
        gap: 14px;
      }
    }
  `]
})
export class DuyurularComponent implements OnInit {

  private ministryUrl = 'https://saglik.gov.tr/TR,11693/duyurular.html';

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Resmî Sağlık Duyuruları | Ajans Sağlık',
      description:
        'T.C. Sağlık Bakanlığı tarafından yayımlanan resmî ve güncel sağlık duyurularına Ajans Sağlık üzerinden güvenle erişin.',
      keywords:
        'sağlık duyuruları, tc sağlık bakanlığı duyurular, resmî sağlık duyuruları'
    });
  }

  goToMinistry(): void {
    window.open(this.ministryUrl, '_blank', 'noopener,noreferrer');
  }
}
