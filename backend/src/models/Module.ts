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

@Table
class Module extends Model<Module> {
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

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;
}

export default Module