import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { CrudService } from 'src/common/crud/crud.service'
import { Leads } from '../leads/leads.model'
import { Users } from '../users/users.model'
import { Tasks } from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { QueryTaskDto } from './dto/query-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService extends CrudService<Tasks> {
  private readonly logger = new Logger(TasksService.name)

  constructor(@InjectModel(Tasks) private readonly tasksModel: typeof Tasks) {
    super(tasksModel)
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.create(createTaskDto)
  }

  async findAllQuerys(queryDto: QueryTaskDto): Promise<any> {
    const { page = 0, pageSize = 10, search, status, priority, leadId } = queryDto
    const offset = page * pageSize
    const limit = pageSize

    const where: any = {}

    if (search) {
      where.title = {
        [Op.iLike]: `%${search}%`,
      }
    }

    if (status) {
      where.status = status
    }

    if (priority) {
      where.priority = priority
    }

    if (leadId !== undefined && leadId !== null) {
      where.leadId = leadId
    }

    try {
      const { rows, count } = await this.tasksModel.findAndCountAll({
        where,
        offset,
        limit,
        include: [
          { model: Users, as: 'assignedUser', attributes: ['id', 'name', 'lastName', 'email'] },
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
      this.logger.error(`Error fetching tasks: ${message}`)
      throw error
    }
  }

  async findOneTask(id: number): Promise<Tasks> {
    const task = await this.tasksModel.findByPk(id, {
      include: [
        { model: Users, as: 'assignedUser', attributes: ['id', 'name', 'lastName', 'email'] },
        { model: Leads, as: 'lead' },
      ],
    })

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return task
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const task = await this.findOneTask(id)
    await task.update(updateTaskDto as any)
    return task
  }

  async deleteTask(id: number): Promise<void> {
    await this.delete(id)
  }
}
