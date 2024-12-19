import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://backend:8080/api/application';

  constructor(private http: HttpClient) { }

  submitApplication(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getApplicationStats(): Observable<{"total": number, "rejected": number}> {
    return this.http.get<{"total": number, "rejected": number}>(`${this.baseUrl}/stats`);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(this.baseUrl, application);
  }

  deleteApplication(id: number): Observable<void>{
    return this.http.delete<void>(this.baseUrl+'/'+id);
  }
}
