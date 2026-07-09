import { Router } from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Roles } from "../../types";
const router: Router = Router();

const { createIssue } = issueController;

router.post(
  "/", authMiddleware(Roles.CONTRIBUTOR, Roles.MAINTAINER),  createIssue,
);
// router.get("/api/issues?sort=newest", () => {});
// router.get("/api/issues/:id", () => {});
// router.patch("/api/issues/:id", () => {});
// router.delete("/api/issues/:id", () => {});

export const issueRoute = router;
