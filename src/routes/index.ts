import { Application } from "express";
import * as swaggerUi from "swagger-ui-express";

import User from "../api/user";
import Admin from "../api/admin";
import Auth from "../api/auth";
import Category from "../api/category";
import Company from "../api/course";
import Promotion from "../api/promotion";
import Dashboard from "../api/dashboard";
import Review from "../api/review";
import Gallery from "../api/gallery";
import Careers from "../api/careers";
import Resume from "../api/resume";
import Subscribe from "../api/subscribe";

import Settings from "../api/settings";

const swaggerDocument = require("../../swagger.json");

export default (app: Application) => {
  app.use("/api/User", User);
  app.use("/api/Dashboard", Dashboard);
  app.use("/api/Auth", Auth);
  app.use("/api/Admin", Admin);
  app.use("/api/Category", Category);
  app.use("/api/Company", Company);
  app.use("/api/Promotion", Promotion);
  app.use("/api/Review", Review);
  app.use("/api/Settings", Settings);
  app.use("/api/Gallery", Gallery);
  app.use("/api/Careers", Careers);
  app.use("/api/Resume", Resume);
  app.use("/api/Subscribe", Subscribe);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
