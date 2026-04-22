import express from "express";
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  getIssue,
  getIssueStats,
  updateIssue,
} from "../controllers/issueController";

const router = express.Router();

router.get("/stats", getIssueStats);
router.get("/", getAllIssues);
router.post("/", createIssue);
router.get("/:id", getIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;
