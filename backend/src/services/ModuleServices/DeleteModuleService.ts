import AppError from "../../errors/AppError";
import Module from "../../models/Module";

const DeleteModuleService = async (id: string): Promise<void> => {
  const module = await Module.findOne({
    where: { id }
  });

  if (!module) {
    throw new AppError("ERR_NO_MODULE_FOUND", 404);
  }

  await module.destroy();
};

export default DeleteModuleService