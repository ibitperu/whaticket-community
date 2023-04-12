import express from "express";
import * as ClassesController from "../controllers/ClassesController";

const classesRoutes = express.Router();

classesRoutes.get("/classes/:moduleId", ClassesController.index);

classesRoutes.post("/classes", ClassesController.store);

classesRoutes.get("/classes/show/:classId", ClassesController.show);

classesRoutes.put("/classes/:classId", ClassesController.update)

classesRoutes.delete("/classes/:classId", ClassesController.remove)


export default classesRoutes;
