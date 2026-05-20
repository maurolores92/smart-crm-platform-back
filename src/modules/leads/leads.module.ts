import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leads } from './leads.model';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [SequelizeModule.forFeature([Leads])],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [SequelizeModule, LeadsService]
})
export class LeadsModule { }
