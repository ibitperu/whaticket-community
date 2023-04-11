import AppError from "../../errors/AppError";
import School from "../../models/School";

interface SchoolData {
  name?: string;
  description?: string;
  enabled?: boolean;
}

interface Request {
  schoolData: SchoolData;
  schoolId: string;
}

const UpdateSchoolService = async ({ schoolData, schoolId }: Request) => {
  const { name, description, enabled } = schoolData;

  const school = await School.findOne({
    where: { id: schoolId },
    attributes: ["id", "name", "description", "enabled"]
  });

  if (!school) {
    throw new AppError("ERR_NO_SCHOOL_FOUND", 404);
  }

  await school.update({
    name,
    description,
    enabled
  });

  await school.reload({
    attributes: ["id", "name", "description", "enabled"]
  });

  return school;
};

export default UpdateSchoolService;
