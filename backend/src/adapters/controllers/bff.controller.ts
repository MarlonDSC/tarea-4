import { Controller, Get, Param } from '@nestjs/common';
import { BffService } from '../../application/services/bff.service';

@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Get('author/:id')
  getAuthorWithBooks(@Param('id') id: string) {
    return this.bffService.getAuthorWithBooks(id);
  }
}