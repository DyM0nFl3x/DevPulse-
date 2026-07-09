import { Router } from "express";
import { issueController } from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Roles } from "../../types";
const router: Router = Router();

const { createIssue, getSingleIssue, getAllIssues, updateIssue, deleteIssue } =
  issueController;

//* protected routes
router.post(
  "/",
  authMiddleware(Roles.CONTRIBUTOR, Roles.MAINTAINER),
  createIssue,
);

router.patch(
  "/:id",
  authMiddleware(Roles.CONTRIBUTOR, Roles.MAINTAINER),
  updateIssue,
);

router.delete(
  "/:id",
  authMiddleware(Roles.CONTRIBUTOR, Roles.MAINTAINER),
  deleteIssue,
); //! api not found

//! unprotected routes
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);

export const issueRoute = router;
