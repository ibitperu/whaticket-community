import AppError from "../../errors/AppError";
import Company from "../../models/Company";

const DeleteCompanyService = async (id: string): Promise<void> => {
  const company = await Company.findOne({
    where: { id }
  });

  if (!company) {
    throw new AppError("ERR_NO_COMPANY_FOUND", 404);
  }

  await company.destroy();
};

export default DeleteCompanyService;
