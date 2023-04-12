import AppError from "../../errors/AppError";
import Company from "../../models/Company";

interface Request {
  name: string;
  description?: string;
  enabled: boolean;
}

const createCompanyService = async ({
  name,
  description,
  enabled
}: Request): Promise<Company> => {
  const companyExists = await Company.findOne({
    where: { name }
  });

  if (companyExists) {
    throw new AppError("ERR_DUPLICATED_COMPANY");
  }

  const company = await Company.create({
    name,
    description,
    enabled
  });

  return company;
};

export default createCompanyService;
