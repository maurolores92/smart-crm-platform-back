import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { QueryTaskDto } from './dto/query-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Auth()
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Get()
  @Auth()
  findAll(@Query(new ValidationPipe({ transform: true })) query: QueryTaskDto) {
    return this.tasksService.findAllQuerys(query)
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.tasksService.findOneTask(+id)
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties: true })) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(+id, updateTaskDto)
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id)
  }
}
