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
  tableName: 'popup',
})
export class Popup extends Model<Popup> {
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
}
