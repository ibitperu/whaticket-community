import Course from "../../models/Course";
import School from "../../models/School";

const GetCoursesService = async (): Promise<Course[]> => {
  const courses = await Course.findAll({
    include: [{ model: School, as: 'school', attributes: ['name']}]
  });

  return courses;
};

export default GetCoursesService;
