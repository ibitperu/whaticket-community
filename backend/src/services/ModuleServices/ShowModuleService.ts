import AppError from "../../errors/AppError";
import Module from "../../models/Module";

const ShowModuleService = async (courseId: string): Promise<Module> => {
  const module = await Module.findOne({
    where: { id: courseId }
  });

  if (!module) {
    throw new AppError("ERR_MODULE_NOT_FOUND");
  }

  return module;
};

export default ShowModuleService;
