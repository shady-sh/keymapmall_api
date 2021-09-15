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
import { Survey } from './survey.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  tableName: 'selected_survey',
})
export class SelectedSurvey extends Model<SelectedSurvey> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(true)
  @ForeignKey(() => Survey)
  @Column(DataType.INTEGER)
  public survey_no!: number;

  @BelongsTo(() => Survey, { foreignKey: 'survey_no' })
  public survey!: Survey;
}
