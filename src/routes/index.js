import { Router } from "express";
//mport { jwt } from "../middlewares/";

import auth from "./auth.route.js";
import user from "./user.route.js";
import content from "./content.route.js";

const router = new Router();

router.use("/auth", auth);
router.use("/content", content);
router.use("/user", user);

export default router;
