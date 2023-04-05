import express from "express";
import * as CoursesController from "../controllers/CoursesController";

const coursesRoutes = express.Router();

coursesRoutes.get("/courses", CoursesController.index);

export default coursesRoutes;
