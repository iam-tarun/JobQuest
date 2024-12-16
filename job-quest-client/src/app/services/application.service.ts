import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/api/application';

  constructor(private http: HttpClient) { }

  submitApplication(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
