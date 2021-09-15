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
import { SubRegion } from './sub_region.model';

@Table({
  timestamps: true,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  tableName: 'main_region',
})
export class MainRegion extends Model<MainRegion> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public no!: number;

  @AllowNull(false)
  @Column(DataType.STRING(10))
  public name!: string;

  @HasMany(() => SubRegion, { onDelete: 'CASCADE' })
  public sub_regions!: SubRegion[];
}
