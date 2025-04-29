import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Method to send the contact form data to the backend
  sendContactForm(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.baseUrl}/api/contact`, data, { headers });
  }
}
