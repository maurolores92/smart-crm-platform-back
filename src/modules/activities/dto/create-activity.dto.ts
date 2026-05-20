import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { ActivityType } from '../activities.model'

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  content!: string

  @IsEnum(ActivityType)
  type!: ActivityType

  @Type(() => Number)
  @IsNumber()
  leadId!: number

  @Type(() => Number)
  @IsNumber()
  userId!: number
}
