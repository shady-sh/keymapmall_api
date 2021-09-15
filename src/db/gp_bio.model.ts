import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  tableName: 'gp_bio',
})
export class GpBio extends Model<GpBio> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public no!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public address!: string;

  @AllowNull(false)
  @Column(DataType.STRING(15))
  public phone!: string;
}
