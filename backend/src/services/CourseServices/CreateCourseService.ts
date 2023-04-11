import AppError from "../../errors/AppError";
import Course from "../../models/Course";

interface Request {
  name: string;
  description?: string;
  enabled: boolean;
  finalExam: string;
  finalProyect: string;
  schoolId: number;
}

const CreateCourseService = async (newCourse: Request): Promise<Course> => {
  const { name } = newCourse;

  const courseExists = await Course.findOne({
    where: { name }
  });

  if (courseExists) {
    throw new AppError("ERR_DUPLICATED_COURSE");
  }

  const course = await Course.create(newCourse);

  return course;
};

export default CreateCourseService;
