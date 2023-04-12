import AppError from "../../errors/AppError";
import Course from "../../models/Course";

interface CourseData {
  name?: string;
  description?: string;
  enabled?: boolean;
  finalExam?: string;
  finalProyect?: string;
  schoolId?: number;
}

interface Request {
  courseData: CourseData;
  courseId: string;
}

const UpdateCourseService = async ({ courseData, courseId }: Request) => {
  const course = await Course.findOne({
    where: { id: courseId },
    attributes: ["id", "name", "description", "enabled", "finalExam", "finalProyect", "schoolId"]
  });

  if (!course) {
    throw new AppError("ERR_NO_COURSE_FOUND", 404);
  }

  await course.update({
    name: courseData.name,
    description: courseData.description,
    enabled: courseData.enabled,
    finalExam: courseData.finalExam,
    finalProyect: courseData.finalProyect,
    schoolId: courseData.schoolId
  });

  await course.reload({
    attributes: ["id", "name", "description", "enabled", "finalExam", "finalProyect", "schoolId"]
  });

  return course;
};

export default UpdateCourseService;
