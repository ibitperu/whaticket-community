import AppError from "../../errors/AppError";
import Company from "../../models/Company";
import CompanyContact from "../../models/CompanyContact";
import Contact from "../../models/Contact";

const ShowContactsForCompanyService = async (
  companyId: string
): Promise<CompanyContact[]> => {
  const company = await Company.findByPk(companyId);

  if (!company) {
    throw new AppError("ERR_COMPANIE_NOT_FOUND");
  }

  const contacts = await CompanyContact.findAll({
    include: [{ model: Contact, as: "contact" }],
    where: { companyId: companyId }
  });

  return contacts;
};

export default ShowContactsForCompanyService;
