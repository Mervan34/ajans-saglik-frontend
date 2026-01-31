import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';
import { ProductFilter } from '../models/filter.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private publicUrl = `${environment.apiUrl}/public/products`;
  private adminUrl = `${environment.apiUrl}/admin/products`;

  constructor(private http: HttpClient) {}

  // Public endpoints - sadece visible=true olanları gösterir
  getVisibleProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.publicUrl, { withCredentials: true });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.publicUrl}/${id}`, { withCredentials: true });
  }

  filterProducts(filter: ProductFilter): Observable<Product[]> {
    let params = new HttpParams();
    
    if (filter.category) {
      params = params.set('category', filter.category);
    }
    if (filter.city) {
      params = params.set('city', filter.city);
    }
    if (filter.minPrice !== undefined) {
      params = params.set('minPrice', filter.minPrice.toString());
    }
    if (filter.maxPrice !== undefined) {
      params = params.set('maxPrice', filter.maxPrice.toString());
    }

    return this.http.get<Product[]>(`${this.publicUrl}/filter`, { 
      params, 
      withCredentials: true 
    });
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.publicUrl}/categories`, {
      withCredentials: true
    });
  }

  // Admin endpoints - tüm ürünleri gösterir
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.adminUrl, { withCredentials: true });
  }

  getProductAdmin(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.adminUrl}/${id}`, { withCredentials: true });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.adminUrl, product, { withCredentials: true });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.adminUrl}/${id}`, product, {
      withCredentials: true
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`, { withCredentials: true });
  }

  markAsSold(id: number): Observable<void> {
    return this.http.patch<void>(`${this.adminUrl}/${id}/sold`, {}, {
      withCredentials: true
    });
  }

  toggleVisibility(id: number): Observable<void> {
    return this.http.patch<void>(`${this.adminUrl}/${id}/toggle-visibility`, {}, {
      withCredentials: true
    });
  }
}