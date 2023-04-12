import AppError from "../../errors/AppError";
import Module from "../../models/Module";

interface Request {
  name: string;
  description?: string;
  enabled: boolean;
  courseId: number;
}

const CreateModuleService = async(moduleData: Request): Promise<Module> => {
  const { name } = moduleData;

  const moduleExists = await Module.findOne({
    where: { name }
  });

  if (moduleExists) {
    throw new AppError("ERR_DUPLICATED_MODULE");
  }

  const module = await Module.create(moduleData);

  return module;
}

export default CreateModuleService