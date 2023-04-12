import AppError from "../../errors/AppError";
import Class from "../../models/Class";

const DeleteClassService = async (id: string): Promise<void> => {
  const classDeleted = await Class.findOne({
    where: { id }
  });

  if (!classDeleted) {
    throw new AppError("ERR_NO_CLASS_FOUND", 404);
  }

  await classDeleted.destroy();
};

export default DeleteClassService