import express from "express";
import * as ModuleController from "../controllers/ModuleController";

const modulesRoutes = express.Router();

modulesRoutes.get("/modules/:courseId", ModuleController.index);

modulesRoutes.post("/modules/", ModuleController.store);

modulesRoutes.get("/modules/:moduleId", ModuleController.show);

modulesRoutes.put("/modules/:moduleId", ModuleController.update);

modulesRoutes.delete("/modules/:moduleId", ModuleController.remove);

export default modulesRoutes;
