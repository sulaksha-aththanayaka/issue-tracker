import mongoose from "mongoose";
import Issue from "../models/issue";
import { CreateIssueRequest, IssueSortOption, QueryFilters } from "@myapp/shared";
import { ApiError } from "../utils/apiError";
import { IssueStatus } from "@myapp/shared";
import { buildMatchQuery, buildSortPipeline } from "../utils/issueQueryBuilder";

export const getIssuesService = async (filters: QueryFilters, userId: string) => {
  const { status, priority, search, sortBy = IssueSortOption.RECENT, page = 1, limit = 10 } = filters;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const matchQuery = buildMatchQuery({ status, priority, search }, userId);
  const sortPipeline = buildSortPipeline(sortBy);

  const [issues, total] = await Promise.all([
    Issue.aggregate([{ $match: matchQuery }, ...sortPipeline, { $skip: skip }, { $limit: limitNum }]),
    Issue.countDocuments(matchQuery),
  ]);

  return {
    issues,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

export const createIssueService = async (data: CreateIssueRequest, userId: string) => {
  const existing = await Issue.findOne({ title: data.title, user: userId });
  if (existing) throw new ApiError(409, "An issue with this title already exists");

  const { title, description, priority, status, dueDate } = data;

  const newIssue = new Issue({
    title,
    description,
    priority,
    status,
    dueDate,
    user: userId,
  });

  return await newIssue.save();
};

export const getIssueService = async (id: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findOne({
    _id: new mongoose.Types.ObjectId(id),
    user: new mongoose.Types.ObjectId(userId),
  });

  return issue;
};

export const updateIssueService = async (id: string, data: Partial<CreateIssueRequest>, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const updated = await Issue.findByIdAndUpdate(
    { _id: id, user: userId },
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

export const deleteIssueService = async (id: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const issue = await Issue.findByIdAndDelete({ _id: id, owner: userId });

  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  return issue;
};

export const getIssueStatsService = async (userId: string) => {
  const [total, open, inProgress, resolved] = await Promise.all([
    Issue.countDocuments({ user: userId }),
    Issue.countDocuments({ user: userId, status: IssueStatus.OPEN }),
    Issue.countDocuments({ user: userId, status: IssueStatus.IN_PROGRESS }),
    Issue.countDocuments({ user: userId, status: IssueStatus.RESOLVED }),
  ]);

  return { total, open, inProgress, resolved };
};
