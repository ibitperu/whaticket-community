import AppError from "../../errors/AppError";
import Company from "../../models/Company";

const ShowCompanyService = async (id: number | string): Promise<Company> => {
  const company = await Company.findOne({
    where: { id }
  });

  if (!company) {
    throw new AppError("ERR_COMPANIE_NOT_FOUND");
  }

  return company;
};

export default ShowCompanyService;
