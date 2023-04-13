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
  BelongsToMany
} from "sequelize-typescript";
import Contact from "./Contact";
import CompanyContact from "./CompanyContact";

@Table
class Company extends Model<Company> {
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

  @BelongsToMany(() => Contact, () => CompanyContact)
  contacts: Contact[];
}

export default Company;
