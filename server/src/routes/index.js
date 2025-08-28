import express from "express";

import userRoutes from "./user.routes.js";
import blogRoutes from "./blog.routes.js";

const router = express.Router();

router.use("/blog", blogRoutes);
router.use("/user", userRoutes);

export default router;

// http://localhost:5000
