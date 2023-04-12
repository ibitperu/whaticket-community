import Company from "../../models/Company";

const GetCompanyService = async (): Promise<Company[]> => {
  const companies = await Company.findAll();

  return companies;
};

export default GetCompanyService;
