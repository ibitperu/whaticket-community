import AppError from "../../errors/AppError";
import Company from "../../models/Company";

interface CompanyData {
  name?: string;
  description?: string;
  enabled?: boolean;
}

interface Request {
  companyData: CompanyData;
  companyId: string;
}

const UpdateCompanyService = async ({
  companyData,
  companyId
}: Request): Promise<Company> => {
  const { name, description, enabled } = companyData;

  const company = await Company.findOne({
    where: { id: companyId },
    attributes: ["id", "name", "description", "enabled"]
  });

  if (!company) {
    throw new AppError("ERR_NO_COMPANY_FOUND", 404);
  }

  await company.update({
    name,
    description,
    enabled
  });

  await company.reload({
    attributes: ["id", "name", "description", "enabled"]
  });

  return company;
};

export default UpdateCompanyService;
