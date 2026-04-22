import mongoose from "mongoose";
import { IssuePriority, IssueStatus } from "../types/issue.types";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: Object.values(IssueStatus),
      default: IssueStatus.OPEN,
    },
    priority: {
      type: String,
      enum: Object.values(IssuePriority),
      default: IssuePriority.LOW,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

delete mongoose.models.Issue;

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
