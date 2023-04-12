import AppError from "../../errors/AppError";
import Course from "../../models/Course";

const ShowCourseService = async (id: number | string) => {
  const course = await Course.findOne({
    where: { id }
  });

  if (!course) {
    throw new AppError("ERR_COURSE_NOT_FOUND");
  }

  return course;
};

export default ShowCourseService;
