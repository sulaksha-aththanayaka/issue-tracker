import mongoose from "mongoose";
import Issue from "../models/issue";
import { CreateIssueRequest, QueryFilters } from "../types/issue.types";
import { ApiError } from "../utils/apiError";

export const getIssuesService = async (filters: QueryFilters) => {
  const { status, priority, search, page = 1, limit = 10 } = filters;

  // Build Dynamic Filter object
  const query: any = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) {
    // Case-insensitive search on the title
    query.title = { $regex: search, $options: "i" };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute queries in parallel for performance
  const [data, total] = await Promise.all([
    Issue.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Issue.countDocuments(query),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createIssueService = async (data: CreateIssueRequest) => {
  const existing = await Issue.findOne({ title: data.title });
  if (existing) throw new ApiError(409, "An issue with this title already exists");
  const newIssue = new Issue(data);
  return await newIssue.save();
};

export const getIssueService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findById(id);

  return issue;
};

export const updateIssueService = async (id: string, data: Partial<CreateIssueRequest>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const updated = await Issue.findByIdAndUpdate(
    id,
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updated) {
    throw new ApiError(404, "Issue not found");
  }

  return updated;
};

export const deleteIssueService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findByIdAndDelete(id);

  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  return issue;
};
