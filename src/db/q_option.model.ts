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
} from 'sequelize-typescript';
import { Question } from './question.model';
import { QType } from './q_type.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'q_option',
})
export class QOption extends Model<QOption> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(false)
  @ForeignKey(() => Question)
  @Column(DataType.INTEGER)
  public q_no!: number;

  @AllowNull(true)
  @ForeignKey(() => QType)
  @Column(DataType.INTEGER)
  public type_no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public content!: string;

  @BelongsTo(() => Question, {
    foreignKey: 'q_no',
    onDelete: 'CASCADE',
  })
  public question!: Question;

  @BelongsTo(() => QType, { foreignKey: 'type_no' })
  public q_type!: QType;
}
