import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Activity } from './activities.model'
import { CreateActivityDto } from './dto/create-activity.dto'
import { QueryActivityDto } from './dto/query-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { Leads } from '../leads/leads.model'
import { Users } from '../users/users.model'

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger(ActivitiesService.name)

  constructor(@InjectModel(Activity) private readonly activityModel: typeof Activity) {}

  async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityModel.create({
      content: createActivityDto.content,
      type: createActivityDto.type,
      leadId: createActivityDto.leadId,
      userId: createActivityDto.userId,
    })
  }

  async findAll(queryDto: QueryActivityDto): Promise<any> {
    const page = Number(queryDto.page ?? 0)
    const pageSize = Number(queryDto.pageSize ?? 10)
    const offset = page * pageSize
    const limit = pageSize
    const where: any = {}

    if (queryDto.type) {
      where.type = queryDto.type
    }

    try {
      const { rows, count } = await this.activityModel.findAndCountAll({
        where,
        offset,
        limit,
        include: [
          { model: Users, as: 'user', attributes: ['id', 'name', 'lastName', 'email'] },
          { model: Leads, as: 'lead' },
        ],
        order: [['createdAt', 'DESC']],
      })

      return {
        total: count,
        data: rows,
        page,
        pageSize,
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      this.logger.error(`Error fetching activities: ${message}`)
      throw error
    }
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityModel.findByPk(id, {
      include: [
        { model: Users, as: 'user', attributes: ['id', 'name', 'lastName', 'email'] },
        { model: Leads, as: 'lead' },
      ],
    })

    if (!activity) {
      throw new NotFoundException(`Activity with id ${id} not found`)
    }

    return activity
  }

  async findByLead(leadId: number, queryDto: QueryActivityDto): Promise<any> {
    const page = Number(queryDto.page ?? 0)
    const pageSize = Number(queryDto.pageSize ?? 10)
    const offset = page * pageSize
    const limit = pageSize
    const where: any = { leadId }

    if (queryDto.type) {
      where.type = queryDto.type
    }

    const { rows, count } = await this.activityModel.findAndCountAll({
      where,
      offset,
      limit,
      include: [
        { model: Users, as: 'user', attributes: ['id', 'name', 'lastName', 'email'] },
        { model: Leads, as: 'lead' },
      ],
      order: [['createdAt', 'DESC']],
    })

    return {
      total: count,
      data: rows,
      page,
      pageSize,
    }
  }

  async updateActivity(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id)
    await activity.update(updateActivityDto as any)
    return activity
  }

  async removeActivity(id: number): Promise<void> {
    const activity = await this.findOne(id)
    await activity.destroy()
  }
}
