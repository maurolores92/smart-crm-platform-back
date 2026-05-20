import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ActivitiesController } from './activities.controller'
import { ActivitiesService } from './activities.service'
import { Activity } from './activities.model'
import { Leads } from '../leads/leads.model'
import { Users } from '../users/users.model'

@Module({
  imports: [SequelizeModule.forFeature([Activity, Leads, Users])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
