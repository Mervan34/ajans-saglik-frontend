import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest, RequestStatus } from '../models/contact-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private publicUrl = `${environment.apiUrl}/contact`;
  private adminUrl = `${environment.apiUrl}/admin/contacts`;

  constructor(private http: HttpClient) {}

  // Public endpoint
  createContactRequest(request: ContactRequest): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(this.publicUrl, request, {
      withCredentials: true
    });
  }
  // Admin - delete
deleteContactRequest(id: number): Observable<void> {
  return this.http.delete<void>(`${this.adminUrl}/${id}`, {
    withCredentials: true
  });
}


  // Admin endpoints
  getAllContactRequests(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(this.adminUrl, { withCredentials: true });
  }

  getContactRequest(id: number): Observable<ContactRequest> {
    return this.http.get<ContactRequest>(`${this.adminUrl}/${id}`, {
      withCredentials: true
    });
  }

  updateRequestStatus(id: number, status: RequestStatus): Observable<void> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<void>(`${this.adminUrl}/${id}/status`, null, { 
      params,
      withCredentials: true
    });
  }
}