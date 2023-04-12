import AppError from "../../errors/AppError";
import School from "../../models/School";

const ShowSchoolService = async (id: number | string) => {
  const school = await School.findOne({
    where: { id }
  });

  if (!school) {
    throw new AppError("ERR_SCHOOL_NOT_FOUND");
  }

  return school;
};

export default ShowSchoolService;
