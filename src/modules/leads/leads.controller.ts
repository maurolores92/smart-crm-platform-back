import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Auth()
  create(@Body(new ValidationPipe()) createLeadDto: CreateLeadDto) {
    return this.leadsService.createLead(createLeadDto);
  }

  @Get()
  @Auth()
  findAll(@Query(new ValidationPipe({ transform: true })) query: QueryLeadDto) {
    return this.leadsService.findAllQuerys(query);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.leadsService.findOneLead(+id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties: true })) updateLeadDto: UpdateLeadDto,
  ) {
    return this.leadsService.updateLead(+id, updateLeadDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.leadsService.deleteLead(+id);
  }
}
