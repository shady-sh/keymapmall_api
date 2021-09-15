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
import { User } from './user.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'q_log',
})
export class QLog extends Model<QLog> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public no!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public user_no!: number;

  @AllowNull(false)
  @ForeignKey(() => Question)
  @Column(DataType.INTEGER)
  public q_no!: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public subjective!: string;

  @BelongsTo(() => User, {
    foreignKey: 'user_no',
    onDelete: 'CASCADE',
  })
  public user!: User;

  @BelongsTo(() => Question, { foreignKey: 'q_no' })
  public question!: Question;
}
