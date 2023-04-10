import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import Course from "./Course";

@Table
class School extends Model<School> {
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

  @HasMany(() =>Course)
  Courses: Course[];
}

export default School
