import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeConvertService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Method to convert code using the backend API
  convertCode(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/api/convert`, payload);
  }
}

