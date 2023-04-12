import AppError from "../../errors/AppError";
import Course from "../../models/Course";

const DeleteCourseService = async (id: string): Promise<void> => {
  const course = await Course.findOne({
    where: { id }
  });

  if (!course) {
    throw new AppError("ERR_NO_SCHOOL_FOUND", 404);
  }

  await course.destroy();
};

export default DeleteCourseService
