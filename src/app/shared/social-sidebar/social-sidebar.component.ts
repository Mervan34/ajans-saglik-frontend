import { Component } from '@angular/core';

@Component({
  selector: 'app-social-sidebar',
  standalone: true,
  template: `
    <div class="social-sidebar">
      <a href="https://www.facebook.com/share/1864ssXqsQ/" target="_blank" class="social-icon facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://x.com/ajanssagl14194" target="_blank" class="social-icon x">
        <i class="fab fa-x-twitter"></i>
      </a>
      <a href="https://www.linkedin.com/in/ajans-sa%C4%9Fl%C4%B1k-dan%C4%B1%C5%9Fmanl%C4%B1k-0ba614279/?originalSubdomain=tr" target="_blank" class="social-icon linkedin">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a href="https://www.instagram.com/ajansaglik.tr/" target="_blank" class="social-icon instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://wa.me/905326599277" target="_blank"  class="social-icon whatsapp whatsapp-special lower">
        <i class="fab fa-whatsapp"></i>
        <span>Bizimle İletişime Geçin</span>
      </a>
    </div>
  `,
  styles: [`
    .social-sidebar {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 999;
      pointer-events: none;
    }

    .social-sidebar .social-icon {
  pointer-events: auto;
}

    .social-icon {
      width: 48px;
  height: 48px;
  background: rgba(0,0,0,0.6); /* yarı şeffaf koyu arka plan */
  color: white;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 1.4rem; /* biraz büyük ikon */
  text-decoration: none;
    }

 .social-icon.whatsapp {
  background:#25D366;
  color:white;
}

/* SADECE WhatsApp’ın boyutu ve görünümü */
.whatsapp-special {
  width: auto;
  min-height: 50px;
  padding: 0 16px;
  gap: 10px;
  border-radius: 14px 0 0 14px;
  font-size: 1rem;

  display: flex;
  align-items: center;
}

/* WhatsApp ikonunu biraz büyütelim */
.whatsapp-special {
  max-width: 220px;
  white-space: nowrap;
}
.social-sidebar {
  align-items: flex-end;
}


    .social-icon:hover { transform: translateX(-4px); }
    .social-icon.facebook:hover { background: #1877f2; }
    .social-icon.twitter:hover { background: #1da1f2; }
    .social-icon.linkedin:hover { background: #0a66c2; }
    .social-icon.instagram:hover { background: #e1306c; }
    .social-icon.whatsapp:hover { background:#25D366; }

    .lower { margin-top: 130px; }

   @media (max-width: 768px) {
  .social-sidebar {
    display: flex;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    gap: 10px;
    align-items: flex-end;
  }

  .social-icon {
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
  }

  .whatsapp-special span {
    display: none;
  }

  .whatsapp-special {
    padding: 0;
    justify-content: center;
    border-radius: 8px 0 0 8px;
  }

  .lower {
    margin-top: 80px;
  }
}


  `]
})
export class SocialSidebarComponent {}
