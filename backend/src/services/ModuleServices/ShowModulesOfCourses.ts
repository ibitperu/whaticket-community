import AppError from "../../errors/AppError";
import Module from "../../models/Module";

const ShowModulesOfCourses = async (courseId: string) => {
  const modules = await Module.findAll({
    where: { courseId },
    attributes: ["id", "name", "description", "enabled"]
  });

  if (!modules) {
    throw new AppError("ERR_NO_MODULES_FOUND", 404);
  }

  return modules
};

export default ShowModulesOfCourses;
