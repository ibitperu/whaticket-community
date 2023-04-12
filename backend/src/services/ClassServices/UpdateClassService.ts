import AppError from "../../errors/AppError";
import Class from "../../models/Class";

interface ClassData {
  name?: string;
  description?: string;
  enabled?: boolean;
  message?: string;
  classVideo?: string;
  moduleId?: number;
}

interface Request {
  classData: ClassData;
  classId: string;
}

const UpdateClassService = async ({
  classData,
  classId
}: Request): Promise<Class> => {
  const classUpdated = await Class.findOne({
    where: { id: classId },
    attributes: [
      "id",
      "name",
      "description",
      "message",
      "classVideo",
      "enabled",
      "moduleId"
    ]
  });

  if (!classUpdated) {
    throw new AppError("ERR_NO_CLASS_FOUND", 404);
  }

  await classUpdated.update({
    name: classData.name,
    description: classData.description,
    enabled: classData.enabled,
    message: classData.message,
    classVideo: classData.classVideo,
    moduleId: classData.moduleId
  });

  await classUpdated.reload({
    attributes: [
      "id",
      "name",
      "description",
      "message",
      "classVideo",
      "enabled",
      "moduleId"
    ]
  });

  return classUpdated;
};

export default UpdateClassService;
