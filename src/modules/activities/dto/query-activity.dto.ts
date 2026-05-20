import { IsEnum, IsOptional } from 'class-validator'
import { ActivityType } from '../activities.model'
import { PaginationDto } from 'src/common/dto/pagination.dto'

export class QueryActivityDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ActivityType)
  type?: ActivityType
}
