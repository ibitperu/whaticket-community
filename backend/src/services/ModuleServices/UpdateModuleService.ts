import AppError from "../../errors/AppError";
import Module from "../../models/Module";

interface ModuleData {
  name?: string;
  description?: string;
  enabled?: boolean;
  courseId?: number;
}

interface Request {
  moduleData: ModuleData;
  moduleId: string;
}

const UpdateModuleService = async ({
  moduleData,
  moduleId
}: Request): Promise<Module> => {
  const module = await Module.findOne({
    where: { id: moduleId },
    attributes: ["id", "name", "description", "enabled", "courseId"]
  });

  if (!module) {
    throw new AppError("ERR_NO_MODULE_FOUND", 404);
  }

  await module.update({
    name: moduleData.name,
    description: moduleData.description,
    enabled: moduleData.enabled,
    courseId: moduleData.courseId
  });

  await module.reload({
    attributes: [
      "id",
      "name",
      "description",
      "enabled",
      "courseId"
    ]
  });

  return module;
};

export default UpdateModuleService;
