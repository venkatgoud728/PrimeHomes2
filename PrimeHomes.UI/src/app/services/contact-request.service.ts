import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  interestedIn: string;
  message: string;
  userId?: number | null;
  propertyId?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  private apiUrl = 'https://localhost:7299/api/ContactRequests';

  constructor(private http: HttpClient) {}

  submitContactRequest(
    request: ContactRequest
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      request
    );
  }
}