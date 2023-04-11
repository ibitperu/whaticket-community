import express from "express";
import * as CoursesController from "../controllers/CoursesController";

const coursesRoutes = express.Router();

coursesRoutes.get("/courses", CoursesController.index);

coursesRoutes.post("/courses", CoursesController.store);

coursesRoutes.get("/courses/:courseId", CoursesController.show);

coursesRoutes.put("/courses/:courseId", CoursesController.update)

coursesRoutes.delete("/courses/:courseId", CoursesController.remove)


export default coursesRoutes;
