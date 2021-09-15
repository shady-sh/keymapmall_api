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
import { MainRegion } from './main_region.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  tableName: 'sub_region',
})
export class SubRegion extends Model<SubRegion> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public no!: number;

  @AllowNull(false)
  @ForeignKey(() => MainRegion)
  @Column(DataType.BIGINT)
  public main_region_no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  public name!: string;

  @BelongsTo(() => MainRegion, {
    foreignKey: 'main_region_no',
    onDelete: 'CASCADE',
  })
  public main_region!: MainRegion;
}
