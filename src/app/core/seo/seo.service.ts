import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { SeoData } from './seo.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  update(seo: SeoData) {
    this.title.setTitle(seo.title);

    this.meta.updateTag({
      name: 'description',
      content: seo.description
    });

    if (seo.keywords) {
      this.meta.updateTag({
        name: 'keywords',
        content: seo.keywords
      });
    }

    // Admin / gizli sayfalar
    if (seo.noIndex) {
      this.meta.updateTag({
        name: 'robots',
        content: 'noindex, nofollow'
      });
    } else {
      this.meta.removeTag(`name='robots'`);
    }
  }
}
