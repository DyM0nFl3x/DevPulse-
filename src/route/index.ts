import { Router } from "express";
import authRouter from "./auth.route";

const router = Router();

router.use("/auth", authRouter);
// router.use("/issues", authRouter);


// router.post("/api/issues", () => {});
// router.get("/api/issues?sort=newest", () => {});
// router.get("/api/issues/:id", () => {});
// router.patch("/api/issues/:id", () => {});
// router.delete("/api/issues/:id", () => {});

export default router;