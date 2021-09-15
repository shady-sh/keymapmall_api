import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { QLog } from './q_log.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'user',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public phone!: string;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public email!: string;

  @HasMany(() => QLog, { onDelete: 'CASCADE' })
  public q_log!: QLog[];
}
