import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CrudService } from 'src/common/crud/crud.service';
import { Leads } from './leads.model';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
import { Users } from '../users/users.model';

@Injectable()
export class LeadsService extends CrudService<Leads> {
  private readonly logger = new Logger(LeadsService.name);

  constructor(@InjectModel(Leads) private readonly leadsModel: typeof Leads) {
    super(leadsModel);
  }

  async createLead(createLeadDto: CreateLeadDto): Promise<Leads> {
    try {
      return await this.leadsModel.create({ ...createLeadDto });
    } catch (error) {
      this.logger.error(`Error creating lead: ${error.message}`);
      throw error;
    }
  }

  async findAllQuerys(queryDto: QueryLeadDto): Promise<any> {
    const { page = 0, pageSize = 10, search, status, priority } = queryDto;
    const offset = page * pageSize;
    const limit = pageSize;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    try {
      const { rows, count } = await this.leadsModel.findAndCountAll({
        where,
        offset,
        limit,
        include: [{ model: Users, as: 'assignedUser', attributes: ['id', 'name', 'lastName', 'email'] }],
        order: [['createdAt', 'DESC']],
      });

      return {
        total: count,
        data: rows,
        page,
        pageSize,
      };
    } catch (error) {
      this.logger.error(`Error fetching leads: ${error.message}`);
      throw error;
    }
  }

  async findOneLead(id: number): Promise<Leads> {
    try {
      const lead = await this.leadsModel.findByPk(id, {
        include: [{ model: Users, as: 'assignedUser', attributes: ['id', 'name', 'lastName', 'email'] }],
      });

      if (!lead) {
        throw new NotFoundException(`Lead with id ${id} not found`);
      }

      return lead;
    } catch (error) {
      this.logger.error(`Error fetching lead: ${error.message}`);
      throw error;
    }
  }

  async updateLead(id: number, updateLeadDto: UpdateLeadDto): Promise<Leads> {
    try {
      const lead = await this.findOneLead(id);
      await lead.update(updateLeadDto);
      return lead;
    } catch (error) {
      this.logger.error(`Error updating lead: ${error.message}`);
      throw error;
    }
  }

  async deleteLead(id: number): Promise<void> {
    try {
      const lead = await this.findOneLead(id);
      await lead.destroy();
    } catch (error) {
      this.logger.error(`Error deleting lead: ${error.message}`);
      throw error;
    }
  }
}
