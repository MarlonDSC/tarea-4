import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { EmailService } from '../email/email.service';
import { ReportService } from '../report/report.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly emailService: EmailService,
    private readonly reportService: ReportService,
  ) {}

  async createInvoice(invoiceData: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(invoiceData);
    await this.invoiceRepository.save(invoice);

    // Enviar correo y generar reporte de manera asíncrona
    this.emailService.sendInvoiceConfirmation(invoice);
    this.reportService.generateInvoiceReport(invoice);

    return invoice;
  }
}