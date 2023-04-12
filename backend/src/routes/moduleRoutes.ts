import express from "express";
import * as ModuleController from "../controllers/ModuleController";


const modulesRoutes = express.Router();

modulesRoutes.post("/courses", ModuleController.store);

modulesRoutes.get("/courses/:courseId", ModuleController.show);

modulesRoutes.put("/courses/:courseId", ModuleController.update)

modulesRoutes.delete("/courses/:courseId", ModuleController.remove)


export default modulesRoutes;