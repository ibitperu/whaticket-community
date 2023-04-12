import AppError from "../../errors/AppError";
import Class from "../../models/Class";

const ShowClassesOfModule = async (moduleId: string): Promise<Class[]>=> {
  const classes = await Class.findAll({
    where: { moduleId },
    attributes: ["id", "name", "description", "message", "classVideo", "enabled"]
  });

  if (!classes) {
    throw new AppError("ERR_NO_CLASSES_FOUND", 404);
  }

  return classes
};

export default ShowClassesOfModule;