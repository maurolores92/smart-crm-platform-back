import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "../users/users.model";

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  CLOSED = 'Closed',
}

export enum LeadPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

@Table({ timestamps: true })
export class Leads extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare company: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @Column({
    type: DataType.ENUM(...Object.values(LeadStatus)),
    defaultValue: LeadStatus.NEW,
  })
  declare status: LeadStatus;

  @Column({
    type: DataType.ENUM(...Object.values(LeadPriority)),
    defaultValue: LeadPriority.MEDIUM,
  })
  declare priority: LeadPriority;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare assignedUserId: number;

  @BelongsTo(() => Users)
  declare assignedUser: Users;
}
