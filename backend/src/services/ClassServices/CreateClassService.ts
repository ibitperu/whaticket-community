import AppError from "../../errors/AppError";
import Class from "../../models/Class";

interface Request {
  name: string;
  description?: string;
  message: string;
  classVideo: string;
  enabled: boolean;
  moduleId: number;
}

const CreateClassService = async(classData: Request): Promise<Class> => {
  const { name } = classData

  const classExists = await Class.findOne({
    where: { name }
  });

  if (classExists) {
    throw new AppError("ERR_DUPLICATED_CLASS");
  }

  const newClass = await Class.create(classData);

  return newClass;
}

export default CreateClassService