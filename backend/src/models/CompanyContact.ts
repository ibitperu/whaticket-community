import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import Company from "./Company";
import Contact from "./Contact";

@Table
class CompanyContact extends Model<CompanyContact> {
  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => Contact)
  @Column
  contactId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Contact)
  contact: Contact;

  @BelongsTo(() => Company)
  company: Company;
}

export default CompanyContact;

