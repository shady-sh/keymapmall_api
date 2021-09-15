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
  HasMany,
} from 'sequelize-typescript';
import { QLog } from './q_log.model';
import { QOption } from './q_option.model';
import { Survey } from './survey.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'question',
})
export class Question extends Model<Question> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(false)
  @ForeignKey(() => Survey)
  @Column(DataType.INTEGER)
  public survey_no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public title!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public min!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public max!: number;

  @HasMany(() => QOption, {
    onDelete: 'CASCADE',
  })
  public q_options!: QOption[];

  @HasMany(() => QLog)
  public q_logs!: QLog[];

  @BelongsTo(() => Survey, {
    foreignKey: 'survey_no',
    onDelete: 'CASCADE',
  })
  public survey!: Survey;
}
