import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { ActivitiesService } from './activities.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { QueryActivityDto } from './dto/query-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'

@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('activities')
  @Auth()
  create(@Body(new ValidationPipe()) createActivityDto: CreateActivityDto) {
    return this.activitiesService.createActivity(createActivityDto)
  }

  @Get('activities')
  @Auth()
  findAll(@Query(new ValidationPipe({ transform: true })) query: QueryActivityDto) {
    return this.activitiesService.findAll(query)
  }

  @Get('activities/:id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id)
  }

  @Patch('activities/:id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties: true })) updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.updateActivity(+id, updateActivityDto)
  }

  @Delete('activities/:id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.activitiesService.removeActivity(+id)
  }

  @Get('leads/:id/activities')
  @Auth()
  findByLead(@Param('id') id: string, @Query(new ValidationPipe({ transform: true })) query: QueryActivityDto) {
    return this.activitiesService.findByLead(+id, query)
  }
}
