import AppError from "../../errors/AppError";
import Class from "../../models/Class";

const ShowClassService = async (classId: string): Promise<Class> => {
  const classShow = await Class.findOne({
    where: { id: classId }
  });

  if (!classShow) {
    throw new AppError("ERR_CLASS_NOT_FOUND");
  }

  return classShow;
};

export default ShowClassService;