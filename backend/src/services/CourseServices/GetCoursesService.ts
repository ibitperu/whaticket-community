import Class from "../../models/Class";
import Course from "../../models/Course";
import Module from "../../models/Module";
import School from "../../models/School";

const GetCoursesService = async (): Promise<Course[]> => {
  const courses = await Course.findAll({
    include: [
      { model: School, as: "school", attributes: ["name"] },
      {
        model: Module,
        as: "modules",
        attributes: ["name", "enabled"],
        include: [
          {
            model: Class,
            as: "classes",
            attributes: ["name", "enabled", "message", "classVideo"]
          }
        ]
      }
    ]
  });

  return courses;
};

export default GetCoursesService;
