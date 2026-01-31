export enum ProductCategory {
  HASTANE = 'HASTANE',
  HASTANE_KADROSU = 'HASTANE_KADROSU',
  DEVIRLI_POLIKLINIK = 'DEVIRLI_POLIKLINIK',
  TIP_MERKEZI_RUHSATI = 'TIP_MERKEZI_RUHSATI',
  COCUK_HASTALIKLARI = 'COCUK_HASTALIKLARI',
  IC_HASTALIKLARI = 'IC_HASTALIKLARI',
  GENEL_CERRAHI = 'GENEL_CERRAHI',
  KARDIYOLOJI = 'KARDIYOLOJI',
  DIGER = 'DIGER'
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  INACTIVE = 'INACTIVE'
}

export interface Product {
  id?: number;
  title: string;
  city: string;
  category: ProductCategory;
  staff?: string;
  price: number;
  description?: string;
  contactInfo?: string;
  status?: ProductStatus;
  visible?: boolean;
}

export const CATEGORY_NAMES: { [key in ProductCategory]: string } = {
  [ProductCategory.HASTANE]: 'Hastane',
  [ProductCategory.HASTANE_KADROSU]: 'Hastane Kadrosu',
  [ProductCategory.DEVIRLI_POLIKLINIK]: 'Devirli Poliklinik',
  [ProductCategory.TIP_MERKEZI_RUHSATI]: 'Tıp Merkezi Ruhsatı',
  [ProductCategory.COCUK_HASTALIKLARI]: 'Çocuk Hastalıkları',
  [ProductCategory.IC_HASTALIKLARI]: 'İç Hastalıkları',
  [ProductCategory.GENEL_CERRAHI]: 'Genel Cerrahi',
  [ProductCategory.KARDIYOLOJI]: 'Kardiyoloji',
  [ProductCategory.DIGER]: 'Diğer'
};