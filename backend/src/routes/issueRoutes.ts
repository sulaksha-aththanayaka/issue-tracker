import express from "express"
import { createIssue, deleteIssue, getAllIssues, getIssue, updateIssue } from "../controllers/issueController";

const router = express.Router();

router.get("/", getAllIssues);
router.post("/", createIssue);
router.get("/:id", getIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;