import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Users } from "../users/users.model";

@Table({ timestamps: true })
export class Role extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare slug: string;

    @Column(DataType.STRING)
    declare color: string;

    @ForeignKey(() => Users)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare userId: number;

    @BelongsTo(() => Users)
    declare user: Users;

}
