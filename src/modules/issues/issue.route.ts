import { Router } from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Roles } from "../../types";
const router: Router = Router();

const { createIssue, getSingleIssue, getAllIssues } = issueController;

router.post(
  "/",
  authMiddleware(Roles.CONTRIBUTOR, Roles.MAINTAINER),
  createIssue,
);
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
// router.patch("/api/issues/:id", () => {});      //! api not found
// router.delete("/api/issues/:id", () => {});      //! api not found

export const issueRoute = router;
