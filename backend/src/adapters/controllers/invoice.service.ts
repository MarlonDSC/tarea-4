import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://tu-api-url/invoices';

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoiceData);
  }
}