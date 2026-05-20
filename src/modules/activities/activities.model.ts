import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Leads } from '../leads/leads.model'
import { Users } from '../users/users.model'

export enum ActivityType {
  NOTE = 'Note',
  CALL = 'Call',
  MEETING = 'Meeting',
  EMAIL = 'Email',
  FOLLOW_UP = 'Follow Up',
}

@Table({ tableName: 'activities', timestamps: true, updatedAt: false })
export class Activity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string

  @Column({
    type: DataType.ENUM(...Object.values(ActivityType)),
    allowNull: false,
  })
  declare type: ActivityType

  @ForeignKey(() => Leads)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare leadId: number

  @BelongsTo(() => Leads)
  declare lead: Leads

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number

  @BelongsTo(() => Users)
  declare user: Users
}
