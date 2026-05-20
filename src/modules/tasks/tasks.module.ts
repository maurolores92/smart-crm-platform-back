import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Tasks } from './tasks.model'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [SequelizeModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [SequelizeModule, TasksService],
})
export class TasksModule {}
