import { Router } from "express";

import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import settingRoutes from "./settingRoutes";
import contactRoutes from "./contactRoutes";
import ticketRoutes from "./ticketRoutes";
import whatsappRoutes from "./whatsappRoutes";
import messageRoutes from "./messageRoutes";
import whatsappSessionRoutes from "./whatsappSessionRoutes";
import queueRoutes from "./queueRoutes";
import quickAnswerRoutes from "./quickAnswerRoutes";
import apiRoutes from "./apiRoutes";
import coursesRoutes from "./coursesRoutes";
import schoolRoutes from "./schoolRoutes";
import modulesRoutes from "./moduleRoutes";
import classesRoutes from "./classRoutes";
import companyRoutes from "./companyRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use("/auth", authRoutes);
routes.use(settingRoutes);
routes.use(contactRoutes);
routes.use(ticketRoutes);
routes.use(whatsappRoutes);
routes.use(messageRoutes);
routes.use(whatsappSessionRoutes);
routes.use(queueRoutes);
routes.use(coursesRoutes);
routes.use(schoolRoutes);
routes.use(modulesRoutes);
routes.use(classesRoutes);
routes.use(companyRoutes);
routes.use(quickAnswerRoutes);
routes.use("/api/messages", apiRoutes);

export default routes;
