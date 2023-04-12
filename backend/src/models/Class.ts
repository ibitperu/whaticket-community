import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  HasMany,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import Course from "./Course";
import Module from "./Module";

@Table
class Class extends Model<Class> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  enabled: boolean;
   
  @Column
  message: string;

  @Column
  classVideo: string;

  @ForeignKey(() => Module)
  @Column
  moduleId: number;

  @BelongsTo(() => Module)
  module: Module;
}

export default Class