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
import School from "./School";

@Table
class Course extends Model<Course> {
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
  finalExam: string;

  @Column
  finalProyect: string;

  @ForeignKey(() => School)
  @Column
  schoolId: number;

  @BelongsTo(() => School)
  school: School;
}

export default Course;
