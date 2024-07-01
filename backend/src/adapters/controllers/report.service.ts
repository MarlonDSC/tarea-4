import { Injectable } from '@nestjs/common';
import { Invoice } from '../invoice/invoice.entity';

@Injectable()
export class ReportService {
  async generateInvoiceReport(invoice: Invoice): Promise<void> {
    // Lógica para generar reporte de la factura
  }
}