import express from "express";
import * as SchoolController from "../controllers/SchoolController";

const schoolRoutes = express.Router();

schoolRoutes.get("/schools", SchoolController.index);

schoolRoutes.get("/schools/:schoolId", SchoolController.show);

schoolRoutes.post("/schools", SchoolController.store);

export default schoolRoutes;

