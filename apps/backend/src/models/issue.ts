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
      type: String, // TODO: REFACTOR
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
  },
  { timestamps: true },
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
