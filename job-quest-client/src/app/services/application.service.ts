import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitApplication(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/application`, data);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<any[]>(`${this.baseUrl}/application`);
  }

  getApplicationStats(): Observable<{"total": number, "rejected": number}> {
    return this.http.get<{"total": number, "rejected": number}>(`${this.baseUrl}/application/stats`);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(this.baseUrl+'/application', application);
  }

  deleteApplication(id: number): Observable<void>{
    return this.http.delete<void>(this.baseUrl+'/application/'+id);
  }
}
