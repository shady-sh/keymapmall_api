import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { SelectedSurvey } from './selected_survey.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'survey',
})
export class Survey extends Model<Survey> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  public name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public info!: string;

  @HasMany(() => Question, { onDelete: 'CASCADE' })
  public questions!: Question[];

  @HasOne(() => SelectedSurvey)
  public selected_survey!: SelectedSurvey;
}
