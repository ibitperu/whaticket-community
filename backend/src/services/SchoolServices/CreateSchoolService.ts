import AppError from "../../errors/AppError";
import School from "../../models/School";

interface Request {
  name: string;
  description?: string;
  enabled: boolean;
}

const createSchoolService = async ({ name, description, enabled }: Request): Promise<School> => {
  const schoolExists = await School.findOne({
    where: { name }
  });

  if (schoolExists) {
    throw new AppError("ERR_DUPLICATED_SCHOOL");
  }

  const school = await School.create(
    {
      name,
      description,
      enabled,
    }
  );

  return school
}

export default createSchoolService