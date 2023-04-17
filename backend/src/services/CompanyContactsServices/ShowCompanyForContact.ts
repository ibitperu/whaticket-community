import AppError from "../../errors/AppError";
import Company from "../../models/Company";
import CompanyContact from "../../models/CompanyContact";
import Contact from "../../models/Contact";

const ShowCompanyForContact = async (contactId: string) => {
  const contact = await Contact.findByPk(contactId);

  if (!contact) {
    throw new AppError("ERR_CONTACT_NOT_FOUND");
  }

  const company = await CompanyContact.findOne({
    include: [{ model: Company, as: "company" }],
    where: { contactId: contactId }
  });

  console.log(company)

  if(!company) {
    return null
  }

  return company;
};

export default ShowCompanyForContact;
