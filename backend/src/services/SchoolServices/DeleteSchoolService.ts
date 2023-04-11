import AppError from "../../errors/AppError";
import School from "../../models/School";

const DeleteSchoolService = async (id: string): Promise<void> => {
  const school = await School.findOne({
    where: { id }
  });

  if (!school) {
    throw new AppError("ERR_NO_SCHOOL_FOUND", 404);
  }

  await school.destroy();
};

export default DeleteSchoolService;
