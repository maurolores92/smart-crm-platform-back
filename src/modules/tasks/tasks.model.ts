import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Users } from '../users/users.model'
import { Leads } from '../leads/leads.model'

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

@Table({ timestamps: true })
export class Tasks extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
    defaultValue: TaskStatus.PENDING,
  })
  declare status: TaskStatus

  @Column({
    type: DataType.ENUM(...Object.values(TaskPriority)),
    allowNull: false,
    defaultValue: TaskPriority.MEDIUM,
  })
  declare priority: TaskPriority

  @Column({ type: DataType.DATE, allowNull: true })
  declare dueDate: Date

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare assignedUserId: number

  @BelongsTo(() => Users)
  declare assignedUser: Users

  @ForeignKey(() => Leads)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare leadId: number

  @BelongsTo(() => Leads)
  declare lead: Leads

  declare createdAt: Date
}
