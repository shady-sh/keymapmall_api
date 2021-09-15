import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { QOption } from './q_option.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'q_type',
})
export class QType extends Model<QType> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(true)
  @Column(DataType.STRING(45))
  public info!: string;

  @HasOne(() => QOption)
  public q_option!: QOption;
}
